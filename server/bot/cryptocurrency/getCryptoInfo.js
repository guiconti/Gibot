/**
 * Module to get crypto info
 * @module controllers/cryptocurrency/getCryptoInfo
*/

const bot = require('../../core/gibimbot');
const logger = require('../../../tools/logger');
const request = require('request');
const constants = require('../../utils/constants');

module.exports = (msg, match) => {
  let chatId = msg.chat.id;
  let cryptoCurrencyInfoUrl = constants.url.cryptoCurrency.PREFIX + constants.url.cryptoCurrency.CRYPTO_CONVERT_SUFFIX + 
    '?fromCurrency=BTC&toCurrency=XRP';
  request.get({url: cryptoCurrencyInfoUrl}, (err, httpResponse, body) => {
    if (err)
      return bot.sendMessage(chatId, constants.message.error.CRYPTO_INFO);
    let response = JSON.parse(body);
    if (!response.msg)
      return bot.sendMessage(chatId, constants.message.error.CRYPTO_INFO);
    return bot.sendMessage(chatId, response.msg);
  });
};
