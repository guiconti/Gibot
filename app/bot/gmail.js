/**
 * Módulo de ações do Gmail
 * @module bot/gmail
 */

//  TODO: Melhorar isso
/**
 * Array para as possíveis variações de cada ação no Gmail.
 * @readonly
 * @const {string[]}
 */
const listActions = ['liste','list','listar','lista'];

/**
 * Valor que armaneza o prefixo a ser utilizado em toda a requisição do Gmail.
 * @readonly
 * @const {string}
 */
const GMAIL_PREFIX = process.env.NODE_ENV=='development'?'http://localhost:3101/gmail/':'http://ec2-52-67-130-125.sa-east-1.compute.amazonaws.com:3101/gmail/';

/**
 * Enum para as possíveis ações no Gmail.
 * @readonly
 * @enum {string}
 */
var GmailActions = {
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

                /*  Quebra toda a requisição em um array separado por ";" */
                var resp = match[1].split(';');
            
            } catch (e) {

                return bot.sendMessage(chatId, 'Comando do gmail inválido. Tente enviar o comando com a seguinte sintaxe: /g "Ação desejada"');

            }

            /*  Avaliamos se a ação é uma ação válida do Gmail/bot */
            if (!telegram.validation.isValidGmailAction(resp)) {

                return bot.sendMessage(chatId, 'Comando do gmail inválido. Tente enviar o comando com a seguinte sintaxe: /g "Ação desejada"');

            } else {

                /*  Verificamos qual a ação solicitada, encaminhamos para a função da ação e enviamos a resposta */
                switch (identifyAction(resp[0].toLowerCase().trim())) {

                    case GmailActions.LIST:

                        listEvents(resp).then((events) => {

                            if (events.length == 0){

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

/**
 * Identifica qual a ação solicitada no Gmail.
 *
 * @param {string} action - Ação a ser verificada
 * @return {string} - Nome da ação normalizado para ser utilizado na requisição
 */
function identifyAction(action) {

    return _.contains(listActions, action)?GmailActions.LIST:undefined;

};

/**
 * Executa a ação de listar no Gmail utilizando as API de listagem.
 * Recebe uma requsição de lista enviada pelo Telegram e executa.
 *
 * @param {string[]} userRequest - Array com todas as informações da requisição (após o /g).
 * @return {Promise.string[]} - Uma promise que resolve todos os cards listados.
 * @throws {Error} - Rejeita a promise com o erro ocorrido
 */
function listEvents(userRequest) {

    return new Promise((resolve, reject) => {

        try {

            var days;
            var initialDate;
            var finalDate;

            /*  Pega as informações da requisição */
            if(telegram.validation.isValidDate(userRequest[1])) {

                /** Caso a requsição seja no formato de data */
                initialDate = userRequest[1]?userRequest[2].trim():0;
                finalDate = userRequest[2]?userRequest[2].trim():0;

            } else {

                /** Caso a requsição seja no formato de dia */
                days = userRequest[1]?userRequest[1].trim():0;

            }

            /*  Monta a URL para a requsição */
            var url = GMAIL_PREFIX + GmailActions.LIST + '?days=' + days + '&initialDate=' + initialDate + '&finalDate=' + finalDate;

        } catch(e) {

            return reject(e);

        }

        /*  Realiza chamada na API de listagem */
        request.get({url: url}, (err, httpResponse, eventsList) => {

            try {

                if (err){

                    return reject(err);

                } else {

                    /*  Tratamos a resposta da API em JSON para um Objeto e enviamos a lista*/
                    var events = JSON.parse(eventsList);

                    if (!_.isArray(events.msg)){

                        return reject();

                    } else {

                        verboseEvents = [];

                        events.msg.forEach(function(event){

                            var actualEvent = event.summary + ' das ' + moment(event.start).calendar() + ' até ' + moment(event.end).calendar();

                            verboseEvents.push(actualEvent);

                        });

                        return resolve(verboseEvents);

                    }

                }

            } catch (e) {

                return reject(e);

            }

        }, (err) => {

            return reject(err);

        });
    });
};
