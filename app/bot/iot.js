var identifyAction = require('./iot/identifyAction.js').identifyAction;
var getPhoto = require('./iot/getPhoto.js').getPhoto;

/**
 * Módulo de ações do IoT
 * @module bot/gmail
 */

/**
 * Valor que armaneza o prefixo a ser utilizado em toda a requisição do Iot.
 * @readonly
 * @const {string}
 */
IOT_PREFIX = process.env.NODE_ENV=='development'?'http://localhost:3102/api/':'http://ec2-52-67-130-125.sa-east-1.compute.amazonaws.com:3102/api/';

/**
 * Enum para as possíveis ações no Gmail.
 * @readonly
 * @enum {string}
 */
IoTActions = {
	PHOTO: 'photo'
};

/**
 * Executa uma ação IoT utilizando as APIs do mesmo.
 * Receba uma mensagem enviada pelo Telegram, avalia a ação e executa caso tudo esteja de acordo
 *
 * @param {object} msg - Mensagem enviada para o bot solicitando ação no IoT.
 * @param {object} msg.chat - Informações do chat em que a solicitação aconteceu.
 * @param {integer} msg.chat.id - ID do chat em que a solicitação ocorreu.
 * @param {object} msg.from - Informações sobre a pessoa que realizou a solicitação.
 * @param {integer} msg.from.id - ID da pessoa que solicitou a ação.
 * @param {string[]} match - Array com todas as informações da requisição (após o /i).
 * @return {bot.sendMessage} - Retorna a execução da resposta no Telegram.
 */
exports.executeIoTAction = (msg, match) => {

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
                    
                    action: request[0]
                    
                };
            
            } catch (e) {

                return bot.sendMessage(chatId, 'Comando do iot inválido. Tente enviar o comando com a seguinte sintaxe: /i "Ação desejada"');

            }

            /*  Avaliamos se a ação é uma ação válida do Gmail/bot */
            if (!telegram.validation.isValidIoTAction(resp)) {

                return bot.sendMessage(chatId, 'Comando do iot inválido. Tente enviar o comando com a seguinte sintaxe: /i "Ação desejada"');

            } else {

                /*  Verificamos qual a ação solicitada, encaminhamos para a função da ação e enviamos a resposta */
                switch (identifyAction(resp.action.toLowerCase().trim())) {

                    case IoTActions.PHOTO:

                        if(process.env.NODE_ENV=='development'){

                            getPhoto(resp).then(() => {

                                return bot.sendPhoto(chatId, process.cwd() + '/image/room.jpg');
                                //return bot.sendPhoto(chatId, 'http://localhost:3102/api/images/room.jpg');

                            }, (err) => {

                                //	TODO: Melhorar isso
                                return bot.sendMessage(chatId, 'A API da foto não se encontra disponível.');

                            });
                        }
                 
                        break;

                    default:
                        return bot.sendMessage(chatId, 'Essa ação não é válida. Por enquanto eu sei apenas tirar fotos.');
                        break;

                }
            }
        }

	}, (err) => {

		return bot.sendMessage(chatId, 'Cara, vou ficar te devendo essa, deu algum erro aqui.');

	});
};
