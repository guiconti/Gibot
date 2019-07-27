/**
 * Module to register user's
 * @module controllers/itau/registerUser
 */

const bot = require('../../core/gibimbot');
const database = require('../../models/database');
const encryptor = require('../../utils/encryptor');
const cache = require('../../utils/cache');
const login = require('./login');
const constants = require('../../utils/constants');

module.exports = async (msg, match) => {
  const chatId = msg.chat.id;

  if (cache.get(chatId + constants.cache.STATE) !== constants.states.RECEIVE_PASSWORD) return;

  cache.set(chatId + constants.cache.STATE, constants.states.REGISTERING);
  let userData = cache.get(chatId + constants.cache.USER_DATA);
  let registerIndex = cache.get(chatId + constants.cache.CURRENT_REGISTER_INDEX);
  userData[registerIndex].password = msg.text;
  cache.set(chatId + constants.cache.USER_DATA, userData);
  bot.sendMessage(chatId, constants.message.info.REGISTERING);
  let loginData = await login(userData[registerIndex]).catch(err => {
    return bot.sendMessage(chatId, err);
  });
  cache.set(chatId + constants.cache.STATE, constants.states.NOT_INITIATED);
  cache.set(userData[registerIndex].card, loginData.token);
  bot.sendMessage(chatId, loginData.msg);
  userData[registerIndex].card = encryptor(
    userData[registerIndex].card,
    constants.itau.CARD_ENCRYPTATION_KEY
  );
  userData[registerIndex].password = encryptor(
    userData[registerIndex].password,
    constants.itau.PASSWORD_ENCRYPTATION_KEY
  );
  const newUser = new database.User({ 
    chatId: chatId, 
    card: userData[registerIndex].card,
    password: userData[registerIndex].password,
    type: userData[registerIndex].type  
  });
  newUser.save();
};
