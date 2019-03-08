/**
 * Module to register user's
 * @module controllers/itau/registerUser
*/

const bot = require('../../core/gibimbot');
const cache = require('../../utils/cache');
const request = require('request');
const constants = require('../../utils/constants');

module.exports = async (msg, match) => {
  const chatId = msg.chat.id;
  if (cache.get(chatId + constants.cache.STATE) !== constants.states.RECEIVE_PASSWORD)
    return;
  cache.set(chatId + constants.cache.STATE, constants.states.REGISTERING);
  let userData = cache.get(chatId + constants.cache.USER_DATA);
  let registerIndex = cache.get(chatId + constants.cache.CURRENT_REGISTER_INDEX);
  userData[registerIndex].password = msg.text;
  cache.set(chatId + constants.cache.USER_DATA, userData);
  let body = {
    type: userData[registerIndex].type,
    card: userData[registerIndex].card,
    password: userData[registerIndex].password
  };
  bot.sendMessage(chatId, constants.message.info.REGISTERING);
  request.post({ url: 'http://localhost:3001/auth/login', json: body }, (err, httpResponse, body) => {
    if (err)
      return bot.sendMessage(chatId, constants.message.error.REGISTER_ERROR);
    console.log(body);
    //return bot.sendMessage(chatId, body);
  });
};
