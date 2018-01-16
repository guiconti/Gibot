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
  let url = constants.url.cryptoCurrency.PREFIX + constants.url.cryptoCurrency.CRYPTO_FULL_FORM_SUFFIX;
  let headers = constants.url.cryptoCurrency.HEADERS;
  let body = {
    id: msg.from.id,
    coin: constants.regex.CRYPTO_FULL_FORM.exec(msg.text)[1]
  };
  request.post({
    url: url,
    json: body,
    headers: headers
  }, (err, httpResponse, body) => {
    if (err){
      logger.error(err);
      return bot.sendMessage(chatId, constants.message.error.TOP_PICK_API);
    }
      return bot.sendMessage(chatId, body.msg);
  });
};
