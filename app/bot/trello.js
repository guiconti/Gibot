/**
 * Módulo de aplicação de ações do Trello
 * @module bot/trello
 */

//  TODO: Melhorar isso
/**
 * Array para as possíveis variações de cada ação no Trello.
 * @readonly
 * @const {string[]}
 */
const listActions = ['liste','list','listar','lista'];
const insertActions = ['insert','inserir','insere','insira'];

/**
 * Valor que armaneza o prefixo a ser utilizado em toda a requisição do Trello.
 * @readonly
 * @const {string}
 */
const TRELLO_PREFIX = process.env.NODE_ENV=='development'?'http://localhost:3101/trello/':'http://ec2-52-67-130-125.sa-east-1.compute.amazonaws.com:3101/trello/';

/**
 * Enum para as possíveis ações no Trello.
 * @readonly
 * @enum {string}
 */
var TrelloActions = {
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

                /*  Quebra toda a requisição em um array separado por ";" */
                resp = match[1].split(';');
            
            } catch (e) {

                return bot.sendMessage(chatId, 'Comando do trello inválido. Tente enviar o comando com a seguinte sintaxe: /t "Ação desejada"; "Board desejada"; "Lista desejada";"Card desejada caso queira inserir"');

            }

            /*  Avaliamos se a ação é uma ação válida do Trello/bot */
            if (!telegram.validation.isValidTrelloAction(resp)) {

                return bot.sendMessage(chatId, 'Comando do trello inválido. Tente enviar o comando com a seguinte sintaxe: /t "Ação desejada"; "Board desejada"; "Lista desejada";"Card desejada caso queira inserir"');

            } else {

                /*  Verificamos qual a ação solicitada, encaminhamos para a função da ação e enviamos a resposta */
                switch (identifyAction(resp[0].toLowerCase().trim())) {

                    case TrelloActions.LIST:

                        listList(resp).then((cards) => {

                            bot.sendMessage(chatId, cards.msg.join('\n\n'));

                        }, (err) => {

                            //	TODO: Melhorar isso
                            bot.sendMessage(chatId, 'Você não possui a combinação de Board e List requisitada.');

                        });

                        break;
                        

                    case TrelloActions.INSERT:

                        if (telegram.validation.isValidCard(resp[3])) {
                
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

/**
 * Identifica qual a ação solicitada no Trello.
 *
 * @param {string} action - Ação a ser verificada
 * @return {string} - Nome da ação normalizado para ser utilizado na requisição
 */
function identifyAction(action) {

    return _.contains(listActions, action)?TrelloActions.LIST:
        _.contains(insertActions, action)?TrelloActions.INSERT:undefined;

}

/**
 * Executa a ação de listar no Trello utilizando as API de listagem.
 * Recebe uma requsição de lista enviada pelo Telegram e executa.
 *
 * @param {string[]} userRequest - Array com todas as informações da requisição (após o /t).
 * @return {Promise.string[]} - Uma promise que resolve todos os cards listados.
 * @throws {Error} - Rejeita a promise com o erro ocorrido
 */
function listList(userRequest) {

    return new Promise((resolve, reject) => {

        var url;

        try {

            /*  Pega as informações da requisição */
            var boardName = userRequest[1].trim();
            var listName = userRequest[2].trim();

            /*  Monta a URL para a requsição */
            url = TRELLO_PREFIX + boardName + '/' + listName + '/' + TrelloActions.LIST;

        } catch(e) {

            return reject(e);

        }

        /*  Realiza chamada na API de listagem */
        request.get({url: url}, (err, httpResponse, cardsNames) => {

            try {

                if (err){

                    return reject(err);

                } else {

                    /*  Tratamos a resposta da API em JSON para um Objeto e enviamos a lista*/
                    var cards = JSON.parse(cardsNames);

                    if (!_.isArray(cards.msg)){

                        return reject();

                    } else {

                        return resolve(cards);

                    }

                }

            } catch (e) {

                return reject(e);

            }

        }, (err) => {

            return reject(err);

        });
    });
}

/**
 * Executa a ação de inserir no Trello utilizando as API de listagem.
 * Insere uma card enviada pelo Telegram e executa.
 *
 * @param {string[]} userRequest - Array com todas as informações da requisição (após o /t).
 * @return {Promise.NULL} - Uma promise que resolve caso o card seja inserido
 * @throws {Error} - Rejeita a promise com o erro ocorrido
 */
function insertCard (userRequest) {

    return new Promise((resolve, reject) => {

        try {

            /*  Pega as informações da requisição */
            var boardName = userRequest[1].trim();
            var listName = userRequest[2].trim();
            var cardName = userRequest[3].trim();

            /*  Monta a URL e form para a requsição */
            var url = TRELLO_PREFIX + boardName + '/' + listName + '/' + TrelloActions.INSERT;

            var cardForm = {
                name: cardName
            };

        } catch(e) {

            return reject(e);

        }
        
        /*  Realiza chamada na API de inserção */
        request.post({url: url, form: cardForm}, (err, httpResponse, insertCardJsonResponse) => {

            if (err) {

                return reject(err);

            } else {

                if (httpResponse.statusCode != 200) {

                    return reject();

                } else {

                    return resolve();

                }
            }
        });
    });
}
