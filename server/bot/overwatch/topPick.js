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
  let url = constants.url.overwatch.PREFIX + constants.url.overwatch.TOP_PICK;
  let headers = constants.url.overwatch.HEADERS;
  request.get({url: url, headers: headers}, (err, httpResponse, body) => {
    if (err){
      logger.error(err);
      return bot.sendMessage(chatId, constants.message.error.TOP_PICK_API);
    }
      try {
        let response = JSON.parse(body);
        let userResponse = response.msg;
        if (Array.isArray(response.msg)){
          userResponse = constants.message.info.TOP_PICK_RESPONSE;
          response.msg.forEach((hero) => {
            userResponse += `\n${hero.hero} - ${hero.pick_rate}`;
          });
        }
        return bot.sendMessage(chatId, userResponse);
      } catch (err) {
        logger.error(err);
        return bot.sendMessage(chatId, constants.message.error.TOP_PICK_API);
      }
    return bot.sendMessage(chatId, body);
  });
};
