/**
 * Module to bot's overwatch action capture
 * @module controllers/overwatch/commandCenter
*/

const bot = require('../../core/gibimbot');
const request = require('request');
const constants = require('../../utils/constants');

module.exports = (msg, match) => {
  let chatId = msg.chat.id;
  let url = constants.url.OVERWATCH.PREFIX + constants.url.OVERWATCH.TOP_PICK;
  request.get({url: url}, (err, httpResponse, body) => {
    if (err)
      return bot.sendMessage(chatId, constants.message.error.TOP_PICK_API);
    return bot.sendMessage(chatId, body);
  });
};
