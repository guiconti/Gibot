/**
 * Module to convert currency
 * @module controllers/cryptocurrency/convertCurrency
*/

const bot = require('../../core/gibimbot');
const logger = require('../../../tools/logger');
const request = require('request');
const constants = require('../../utils/constants');

module.exports = (msg, match) => {
  let chatId = msg.chat.id;
  let url = constants.url.cryptoCurrency.PREFIX + constants.url.cryptoCurrency.CRYPTO_FULL_FORM_SUFFIX 
    + constants.regex.CRYPTO_FULL_FORM.exec(msg.text)[1];
  let headers = constants.url.cryptoCurrency.HEADERS;
  request.get({
    url: url,
    headers: headers
  }, (err, httpResponse, body) => {
    let dataBody = JSON.parse(body);
    if (err){
      logger.error(err);
      return bot.sendMessage(chatId, constants.message.error.TOP_PICK_API);
    }
      return bot.sendMessage(chatId, dataBody.data);
  });
};
