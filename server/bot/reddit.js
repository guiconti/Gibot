/**
 * Module to reddit actions
 * @module bot/reddit
 */

const request = require('request');
const logger = require('../../tools/logger');
const identifyAction = require('../utils/identifyAction');
const validator = require('../utils/validator');
const constants = require('../utils/constants');
const actions = require('../utils/actions');

/**
 * Executa uma ação do Reddit utilizando as APIs do mesmo.
 * Receba uma mensagem enviada pelo Telegram, avalia a ação e executa caso tudo esteja de acordo
 *
 * @param {object} msg - Mensagem enviada para o bot solicitando ação no Reddit.
 * @param {object} msg.chat - Informações do chat em que a solicitação aconteceu.
 * @param {integer} msg.chat.id - ID do chat em que a solicitação ocorreu.
 * @param {object} msg.from - Informações sobre a pessoa que realizou a solicitação.
 * @param {integer} msg.from.id - ID da pessoa que solicitou a ação.
 * @param {string[]} match - Array com todas as informações da requisição (após o /reddit).
 * @return {bot.sendMessage} - Retorna a execução da resposta no Telegram.
 */
module.exports = (bot, msg, match) => {
  const bot = require('../core/gibimbot');
  const chatId = msg.chat.id;
  try {
    let request = match[1].split(' '); 
    userRequest = {       
      action: request[0],
      subreddit: request[1]
    };

  } catch (err) {
    logger.error(err);
    return bot.sendMessage(chatId, 'Comando do reddit inválido. Tente enviar o comando com a seguinte sintaxe: /reddit "Ação desejada"');
  }

  /*  Avaliamos se a ação é uma ação válida do Reddit/bot */
  if (!validator.isValidRequest(userRequest)) return bot.sendMessage(
    chatId, 'Comando do reddit inválido. Tente enviar o comando com a seguinte sintaxe: /reddit "Ação desejada"'
  );

  /*  Verificamos qual a ação solicitada, encaminhamos para a função da ação e enviamos a resposta */
  switch (identifyAction('REDDIT', userRequest.action.toLowerCase().trim())) {
    case actions.REDDIT.SUBSCRIBE:
      if (!validator.isValidString(userRequest.subreddit)) return bot.sendMessage(
        chatId, 'Subreddit inválido'
      );
      let requestInfo = {
        subreddit: userRequest.subreddit.toLowerCase().trim(),
        chatId: chatId
      };
      let subscribeUrl = constants.url.reddit.PREFIX + constants.url.reddit.SUBSCRIBE_SUFFIX;
      request.post({url: subscribeUrl, json: requestInfo}, (err, httpResponse, html)=>{
        if (err){
          logger.error(err);
          bot.sendMessage(chatId, 'Erro ao se inscrever no subreddit.');
        }
      });
      break;
      
    case actions.REDDIT.SUBSCRIPTIONS:
      let subscriptionsUrl = constants.url.reddit.PREFIX + constants.url.reddit.SUBSCRIPTIONS_SUFFIX + chatId;
      request.get({url: subscriptionsUrl}, (err, httpResponse, html)=>{
        if (err){
          logger.error(err);
          bot.sendMessage(chatId, 'Erro ao listar as inscrições desse chat.');
        }
      });
      break;

    case actions.REDDIT.HELP:
      let message = 'Essas são as funcionalidades que eu sei fazer por enquanto.\n\n';
      message += 'subscribe "subreddit" - Se inscreve em um subreddit para receber os top posts dele a cada 8 horas.\n\n';
      message += 'subscriptions - Retorna todas as suas inscrições ativas';
      return bot.sendMessage(chatId, message);
      break;

    default:
      return bot.sendMessage(chatId, 'Essa ação não é válida. Por enquanto eu sei apenas observar um subreddit.');
      break;
  }
};
