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
  let regexResults = msg.text.match(constants.regex.CRYPTO_CURRENCY_CONVERTER);
  if (!regexResults || regexResults.length < 3 || regexResults[1].length < 3 || regexResults[2].length < 3){
    return bot.sendMessage(chatId, constants.message.error.INVALID_CRYPTO_CURRENCY);
  }
  let cryptoCurrencyInfoUrl = constants.url.cryptoCurrency.PREFIX + constants.url.cryptoCurrency.CRYPTO_CONVERT_SUFFIX + 
    '?fromCurrency='+regexResults[1]+'&toCurrency='+regexResults[2];
  request.get({url: cryptoCurrencyInfoUrl}, (err, httpResponse, body) => {
    if (err)
      return bot.sendMessage(chatId, constants.message.error.CRYPTO_INFO);
    let response = JSON.parse(body);
    if (!response.msg)
      return bot.sendMessage(chatId, constants.message.error.CRYPTO_INFO);
    return bot.sendMessage(chatId, response.msg);
  });
};
