/**
 * Module to bot's overwatch action capture 
 * @module controllers/overwatch/commandCenter
*/

const bot = require('../../core/gibimbot');
const logger = require('../../../tools/logger');
const request = require('request');
const constants = require('../../utils/constants');

module.exports = (msg, match) => {
  let chatId = msg.chat.id;
  let url = constants.url.overwatch.PREFIX + constants.url.overwatch.REGISTER_USER;
  let headers = constants.url.overwatch.HEADERS;
  let body = {
    id: msg.from.id,
    battleTag: constants.regex.OVERWATCH_REGISTER_USER.exec(msg.text)[1]
  };
  request.post({
    url: url,
    json: body,
    headers: headers
  }, (err, httpResponse, body) => {
    if (err){
      logger.error(err);
      return bot.sendMessage(chatId, constants.message.error.TOP_PICK_API);
    }
      return bot.sendMessage(chatId, body.msg);
  });
};
