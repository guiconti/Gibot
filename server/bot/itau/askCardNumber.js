/**
 * Module to ask user's card number
 * @module controllers/itau/askCardNumber
*/

const bot = require('../../core/gibimbot');
const cache = require('../../utils/cache');
const constants = require('../../utils/constants');

module.exports = (msg, match) => {
  const chatId = msg.chat.id;
  if (cache.get(chatId + constants.cache.STATE) !== constants.states.RECEIVE_TYPE)
    return;
  cache.set(chatId + constants.cache.STATE, constants.states.RECEIVE_TYPE);
  bot.sendMessage(chatId, constants.message.info.SEND_CARD, {
    reply_markup: {
      remove_keyboard: true
    }
  });
};
