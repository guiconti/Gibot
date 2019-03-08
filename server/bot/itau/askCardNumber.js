/**
 * Module to ask user's card number
 * @module controllers/itau/askCardNumber
*/

const bot = require('../../core/gibimbot');
const cache = require('../../utils/cache');
const validator = require('../../utils/validator');
const constants = require('../../utils/constants');

module.exports = (msg, match) => {
  const chatId = msg.chat.id;

  if (cache.get(chatId + constants.cache.STATE) !== constants.states.RECEIVE_TYPE)
    return;

  cache.set(chatId + constants.cache.STATE, constants.states.RECEIVE_CARD_NUMBER);
  let userData = cache.get(chatId + constants.cache.USER_DATA);

  if (!validator.isValidArray(userData))
    userData = [];

  userData.push({
    type: msg.text
  });
  cache.set(chatId + constants.cache.USER_DATA, userData);
  cache.set(chatId + constants.cache.CURRENT_REGISTER_INDEX, userData.length - 1);
  bot.sendMessage(chatId, constants.message.info.SEND_CARD, {
    reply_markup: {
      remove_keyboard: true
    }
  });
};
