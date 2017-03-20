var identifyAction = require('./ragnarok/identifyAction.js').identifyAction;
var listMvpTimer = require('./ragnarok/listMvpTimer.js').listMvpTimer;
var inserMvpTimer = require('./ragnarok/insertMvpTimer.js').inserMvpTimer;

/**
 * Módulo de ações do Ragnarok
 * @module bot/ragnarok
 */

/**
 * Valor que armaneza o prefixo a ser utilizado em toda a requisição das APIs do Ragnarok.
 * @readonly
 * @const {string}
 */
RAGNAROK_PREFIX = process.env.NODE_ENV=='development'?'http://localhost:3101/ragnarok/':'http://ec2-52-67-130-125.sa-east-1.compute.amazonaws.com:3101/ragnarok/';

/**
 * Enum para as possíveis ações no Ragnarok.
 * @readonly
 * @enum {string}
 */
RagnarokActions = {
	LIST: 'list',
    INSERT: 'insert'
};

/**
 * Executa uma ação do Ragnarok utilizando as APIs do mesmo.
 * Receba uma mensagem enviada pelo Telegram, avalia a ação e executa caso tudo esteja de acordo
 *
 * @param {object} msg - Mensagem enviada para o bot solicitando ação no Ragnarok.
 * @param {object} msg.chat - Informações do chat em que a solicitação aconteceu.
 * @param {integer} msg.chat.id - ID do chat em que a solicitação ocorreu.
 * @param {object} msg.from - Informações sobre a pessoa que realizou a solicitação.
 * @param {integer} msg.from.id - ID da pessoa que solicitou a ação.
 * @param {string[]} match - Array com todas as informações da requisição (após o /r).
 * @return {bot.sendMessage} - Retorna a execução da resposta no Telegram.
 */
exports.executeRagnarokAction = (msg, match) => {

    var chatId = msg.chat.id;

    try {

        var request = match[1].split(';');

        /*  Quebra toda a requisição em um array separado por ";" */
        resp = {
            
            action: request[0],
            mvpName: request[1],
            killTime: request[2]
            
        };
    
    } catch (e) {

        return bot.sendMessage(chatId, 'Comando do ragnarok inválido. Tente enviar o comando com a seguinte sintaxe: /r "Ação desejada"');

    }

    /*  Avaliamos se a ação é uma ação válida do Ragnarok/bot */
    if (!telegram.validation.isValidRagnarokAction(resp)) {

        return bot.sendMessage(chatId, 'Comando do ragnarok inválido. Tente enviar o comando com a seguinte sintaxe: /r "Ação desejada"');

    } else {

        /*  Verificamos qual a ação solicitada, encaminhamos para a função da ação e enviamos a resposta */
        switch (identifyAction(resp.action.toLowerCase().trim())) {

            case RagnarokActions.LIST:

                listMvpTimer().then((mvpTimers) => {

                    return bot.sendMessage(chatId, mvpTimers);

                }, (err) => {

                    //	TODO: Melhorar isso
                    return bot.sendMessage(chatId, 'Erro ao listar os timers dos MVPs.');

                });

                break;

            case RagnarokActions.INSERT:

                inserMvpTimer(resp).then((mvpTimer) => {

                    return bot.sendMessage(chatId, mvpTimer);

                });

                break;

            default:
                return bot.sendMessage(chatId, 'Essa ação não é válida. Por enquanto eu sei apenas listar.');
                break;

        }
    }
};
