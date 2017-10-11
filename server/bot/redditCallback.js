/**
 * Module to reddit callback
 * @module bot/redditCallback
*/

const request = require('request');
const logger = require('../../tools/logger');
const validator = require('../utils/validator');
const constants = require('../utils/constants');

/**
 * Handle the rate reddit message
 * 
 * @param {string} msgId - Msg that received the feedback
 * @param {object} callbackInfo - Callback query info
 * @param {string} callbackInfo.postId - Post id that received the feedback
 * @param {integer} callbackInfo.value - Feedback score
 * @return {bot.sendMessage} - Retorna a execução da resposta no Telegram.
 */
module.exports = (msgId, callbackInfo) => {
  const bot = require('../core/gibimbot');
  if (!validator.isValidString(callbackInfo.s)){
    return bot.answerCallbackQuery(msgId, constants.message.error.CALLBACK_INVALID);
  }
  if (!validator.isValidString(callbackInfo.p)){
    return bot.answerCallbackQuery(msgId, constants.message.error.CALLBACK_INVALID);
  }
  if (!validator.isValidNumber(parseInt(callbackInfo.v))){
    return bot.answerCallbackQuery(msgId, constants.message.error.CALLBACK_INVALID);
  }
  let rateInfo = {
    subreddit: callbackInfo.s.trim().toLowerCase(),
    postId: callbackInfo.p.trim(),
    score: parseInt(callbackInfo.v)
  };
  let rateUrl = constants.url.REDDIT.PREFIX + constants.url.REDDIT.RATE_SUFFIX;
  bot.answerCallbackQuery(msgId, constants.message.info.REPLY_MARKUP_SENT);
  request.post({url: rateUrl, json: rateInfo}, (err, htmlResponse, body) => {
    console.log(err);
    if (err) {
      logger.error(err);
    }
  });
};
