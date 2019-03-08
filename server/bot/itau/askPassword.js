/**
 * Module to ask user's card password
 * @module controllers/itau/askPassword
*/

const bot = require('../../core/gibimbot');
const cache = require('../../utils/cache');
const constants = require('../../utils/constants');

module.exports = (msg, match) => {
  const chatId = msg.chat.id;
  if (cache.get(chatId + constants.cache.STATE) !== constants.states.RECEIVE_CARD_NUMBER)
    return;
  cache.set(chatId + constants.cache.STATE, constants.states.RECEIVE_PASSWORD);
  bot.sendMessage(chatId, constants.message.info.SEND_PASSWORD);
};
