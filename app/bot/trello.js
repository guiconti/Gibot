var identifyAction = require('./trello/identifyAction.js').identifyAction;
var listList = require('./trello/listList.js').listList;
var insertCard = require('./trello/insertCard.js').insertCard;

/**
 * Módulo de aplicação de ações do Trello
 * @module bot/trello
 */

/**
 * Valor que armaneza o prefixo a ser utilizado em toda a requisição do Trello.
 * @readonly
 * @const {string}
 */
TRELLO_PREFIX = process.env.NODE_ENV=='development'?'http://localhost:3101/trello/':'http://ec2-52-67-130-125.sa-east-1.compute.amazonaws.com:3101/trello/';

/**
 * Enum para as possíveis ações no Trello.
 * ISSO PRECISA SER GLOBAL MAS EU NAO QUERO QUE SEJA
 * @readonly
 * @enum {string}
 */
TrelloActions = {
	LIST: 'list',
	INSERT: 'insert'
};

/**
 * Executa uma ação no Trello utilizando as APIs do mesmo.
 * Receba uma mensagem enviada pelo Telegram, avalia a ação e executa caso tudo esteja de acordo
 *
 * @param {object} msg - Mensagem enviada para o bot solicitando ação no Trello.
 * @param {object} msg.chat - Informações do chat em que a solicitação aconteceu.
 * @param {integer} msg.chat.id - ID do chat em que a solicitação ocorreu.
 * @param {object} msg.from - Informações sobre a pessoa que realizou a solicitação.
 * @param {integer} msg.from.id - ID da pessoa que solicitou a ação.
 * @param {string[]} match - Array com todas as informações da requisição (após o /t).
 * @return {bot.sendMessage} - Retorna a execução da resposta no Telegram.
 */
exports.executeTrelloAction = (msg, match) => {

    var chatId = msg.chat.id;

    /*  Valida se quem realizou a solicitação é o owner */
	telegram.middleware.authOwner(msg.from.id).then((authentication) => {

        /*  Caso não seja o owner */
        if (!authentication){

            return bot.sendMessage(chatId, 'Você não possui acesso a putaria.');

        /*  Caso seja o owner */
        } else {

            var resp;

            try {

                var request = match[1].split(';');

                /*  Quebra toda a requisição em um array separado por ";" */
                resp = {
                    
                    action: request[0],
                    boardName: request[1],
                    listName: request[2],
                    cardName: request[3]
                    
                };
            
            } catch (e) {

                return bot.sendMessage(chatId, 'Comando do trello inválido. Tente enviar o comando com a seguinte sintaxe: /t "Ação desejada"; "Board desejada"; "Lista desejada";"Card desejada caso queira inserir"');

            }

            /*  Avaliamos se a ação é uma ação válida do Trello/bot */
            if (!telegram.validation.isValidTrelloAction(resp)) {

                return bot.sendMessage(chatId, 'Comando do trello inválido. Tente enviar o comando com a seguinte sintaxe: /t "Ação desejada"; "Board desejada"; "Lista desejada";"Card desejada caso queira inserir"');

            } else {

                /*  Verificamos qual a ação solicitada, encaminhamos para a função da ação e enviamos a resposta */
                switch (identifyAction(resp.action.toLowerCase().trim())) {

                    case TrelloActions.LIST:

                        listList(resp).then((cards) => {

                            bot.sendMessage(chatId, cards.msg.join('\n\n'));

                        }, (err) => {

                            //	TODO: Melhorar isso
                            bot.sendMessage(chatId, 'Você não possui a combinação de Board e List requisitada.');

                        });

                        break;
                        

                    case TrelloActions.INSERT:

                        if (telegram.validation.isValidCard(resp.cardName)) {
                
                            insertCard(resp).then(() => {

                                bot.sendMessage(chatId, 'Nova card inserida com sucesso meu amigo!');

                            }, (err) => {

                                //	TODO: Melhorar isso
                                bot.sendMessage(chatId, 'Você não possui a combinação de Board e List requisitada.');

                            });

                        } else {

                            bot.sendMessage(chatId, 'Card no formato incorreto. Mande a sua card apenas como texto!');

                        }

                        break;


                    default:
                        bot.sendMessage(chatId, 'Essa ação não é válida. Por enquanto eu sei apenas listar e inserir.');
                        break;

                }
            }
        }
	}, (err) => {

		return bot.sendMessage(chatId, 'Cara, vou ficar te devendo essa, deu algum erro aqui.');

	});
};