/**
 * Module to handle callback queries
 * @module bot/identifyCallback
 */

const logger = require('../../tools/logger');
const validator = require('./validator');
const constants = require('./constants');
const callbackTypes = require('./callbackTypes');
const redditCallback = require('../bot/redditCallback');

/**
 * Check if a callback query is valid and call the right module to handle it
 *
 * @param {object} callbackQuery - Callback query info
 * @param {object} callbackQuery.type - Type of the callback
 * @return {bot.sendMessage} - Retorna a execução da resposta no Telegram.
 */
module.exports = (callbackQuery) => {
  const bot = require('../core/gibimbot');
  let callbackInfo;
  try {
    callbackInfo = JSON.parse(callbackQuery.data);
  } catch (err){
    logger.error(err);
    return bot.answerCallbackQuery(callbackQuery.id, constants.message.error.CALLBACK_INVALID);
  }
  if (!validator.isValidCallbackQuery(callbackInfo)) {
    return bot.answerCallbackQuery(callbackQuery.id, constants.message.error.CALLBACK_INVALID);
  }
  switch(callbackInfo.t){
    case callbackTypes.REDDIT:
      redditCallback(callbackQuery.id, callbackInfo);
      break;

    default:
      return bot.answerCallbackQuery(callbackQuery.id, constants.message.error.CALLBACK_INVALID);
      break;
  }
};
