/**
 * Module to add card to user
 * @module controllers/itau/addCard
*/

const bot = require('../../core/gibimbot');
const cache = require('../../utils/cache');
const constants = require('../../utils/constants');

module.exports = (msg, match) => {
  let chatId = msg.chat.id;
  cache.set(chatId + constants.cache.STATE, constants.states.RECEIVE_TYPE);
  let keyboard = [];
  Object.keys(constants.itau.types).forEach(key => keyboard.push([constants.itau.types[key]]));
  bot.sendMessage(chatId, constants.message.info.ASK_TYPE, {
    reply_markup: {
      keyboard: keyboard
    }
  });
};
