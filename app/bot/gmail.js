var identifyAction = require('./gmail/identifyAction.js').identifyAction;
var listEvents = require('./gmail/listEvents.js').listEvents;

/**
 * Módulo de ações do Gmail
 * @module bot/gmail
 */

/**
 * Valor que armaneza o prefixo a ser utilizado em toda a requisição do Gmail.
 * @readonly
 * @const {string}
 */
GMAIL_PREFIX = process.env.NODE_ENV=='development'?'http://localhost:3101/gmail/':process.env.SERVER_URL + ':' + process.env.PORT + '/gmail/';

/**
 * Enum para as possíveis ações no Gmail.
 * @readonly
 * @enum {string}
 */
GmailActions = {
	LIST: 'list'
};

/**
 * Executa uma ação no Gmail utilizando as APIs do mesmo.
 * Receba uma mensagem enviada pelo Telegram, avalia a ação e executa caso tudo esteja de acordo
 *
 * @param {object} msg - Mensagem enviada para o bot solicitando ação no Gmail.
 * @param {object} msg.chat - Informações do chat em que a solicitação aconteceu.
 * @param {integer} msg.chat.id - ID do chat em que a solicitação ocorreu.
 * @param {object} msg.from - Informações sobre a pessoa que realizou a solicitação.
 * @param {integer} msg.from.id - ID da pessoa que solicitou a ação.
 * @param {string[]} match - Array com todas as informações da requisição (após o /g).
 * @return {bot.sendMessage} - Retorna a execução da resposta no Telegram.
 */
exports.executeGmailAction = (msg, match) => {

    var chatId = msg.chat.id;

    /*  Valida se quem realizou a solicitação é o owner */
	telegram.middleware.authOwner(msg.from.id).then((authentication) => {

        /*  Caso não seja o owner */
        if (!authentication){

            return bot.sendMessage(chatId, 'Você não possui acesso a putaria.');

        /*  Caso seja o owner */
        } else {

            try {

                var request = match[1].split(';');

                /*  Quebra toda a requisição em um array separado por ";" */
                resp = {
                    
                    action: request[0],
                    initialDate: request[1],
                    finalDate: request[2]
                    
                };
            
            } catch (e) {

                return bot.sendMessage(chatId, 'Comando do gmail inválido. Tente enviar o comando com a seguinte sintaxe: /g "Ação desejada"');

            }

            /*  Avaliamos se a ação é uma ação válida do Gmail/bot */
            if (!telegram.validation.isValidGmailAction(resp)) {

                return bot.sendMessage(chatId, 'Comando do gmail inválido. Tente enviar o comando com a seguinte sintaxe: /g "Ação desejada"');

            } else {

                /*  Verificamos qual a ação solicitada, encaminhamos para a função da ação e enviamos a resposta */
                switch (identifyAction(resp.action.toLowerCase().trim())) {

                    case GmailActions.LIST:

                        listEvents(resp).then((events) => {

                            if (events.length === 0){

                                /** TODO: Melhorar essa resposta */
                                return bot.sendMessage(chatId, 'Você não possui nenhum compromisso nesse período.');

                            } else {

                                return bot.sendMessage(chatId, events.join('\n\n'));

                            }

                        }, (err) => {

                            //	TODO: Melhorar isso
                            return bot.sendMessage(chatId, 'Você não possui acesso ao calendário.');

                        });

                        break;

                    default:
                        return bot.sendMessage(chatId, 'Essa ação não é válida. Por enquanto eu sei apenas listar.');
                        break;

                }
            }
        }

	}, (err) => {

		return bot.sendMessage(chatId, 'Cara, vou ficar te devendo essa, deu algum erro aqui.');

	});
};
