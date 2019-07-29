/**
 * Module to get user's expenses
 * @module controllers/itau/getExpenses
*/

const bot = require('../../core/gibimbot');
const cache = require('../../utils/cache');
const database = require('../../models/database');
const decryptor = require('../../utils/decryptor');
const request = require('request');
const moment = require('moment');
const getToken = require('./getToken');
const constants = require('../../utils/constants');

module.exports = (msg, match) => {
  return new Promise(async (resolve, reject) => {
    let chatId = msg.chat.id;
    let userData = cache.get(chatId + constants.cache.USER_DATA);
    try {
      userData = await database.User.find({ chatId }).lean();
      userData[0].card = decryptor(userData[0].card, constants.itau.CARD_ENCRYPTATION_KEY).toString();
      userData[0].password = decryptor(userData[0].password, constants.itau.PASSWORD_ENCRYPTATION_KEY).toString();
      cache.set(chatId + constants.cache.USER_DATA, userData);
    } catch (err) {
      return bot.sendMessage(chatId, constants.message.error.REGISTRATION_INCOMPLETE);
    }

    if (!userData)
      return bot.sendMessage(chatId, constants.message.error.REGISTRATION_INCOMPLETE);
    
    //  TODO: Support multiple cards/accounts
    let userToken = await getToken(userData[0]).catch(err => {
      return bot.sendMessage(chatId, constants.message.error.REGISTER_ERROR);
    });
    let jar = request.jar();
    jar.setCookie(request.cookie(userToken), constants.url.itau.PREFIX);
    request.get({ url: constants.url.itau.PREFIX + constants.url.itau.EXPENSES, jar: jar }, (err, httpResponse, body) => {
      if (err)
        return reject(err);
      return resolve(JSON.parse(body));
    });
  });
};
