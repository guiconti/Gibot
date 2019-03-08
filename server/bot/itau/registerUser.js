/**
 * Module to register user's
 * @module controllers/itau/registerUser
*/

const bot = require('../../core/gibimbot');
const cache = require('../../utils/cache');
const constants = require('../../utils/constants');

module.exports = (msg, match) => {
  const chatId = msg.chat.id;
  if (cache.get(chatId + constants.cache.STATE) !== constants.states.RECEIVE_PASSWORD)
    return;
  cache.set(chatId + constants.cache.STATE, constants.states.REGISTERING);
  bot.sendMessage(chatId, constants.message.info.REGISTERING);
};
