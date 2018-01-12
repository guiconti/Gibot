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
  let url = constants.url.overwatch.PREFIX + constants.url.overwatch.DELETE_USER;
  let headers = constants.url.overwatch.HEADERS;
  let body = {
    id: msg.from.id,
  };
  request.delete({
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
