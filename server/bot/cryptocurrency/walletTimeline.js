/**
 * Module to get user`s wallet timeline
 * @module controllers/cryptocurrency/walletTimeline
*/

const bot = require('../../core/gibimbot');
const logger = require('../../../tools/logger');
const request = require('request');
const constants = require('../../utils/constants');

module.exports = (msg, match) => {
  let chatId = msg.chat.id;
  let userId = msg.from.id;
  let cryptoTimelineUrl = constants.url.cryptoCurrency.PREFIX + userId +
     constants.url.cryptoCurrency.CRYPTO_TIMELINE_SUFFIX;
  let options = {
    url: cryptoTimelineUrl,
    headers: constants.url.cryptoCurrency.HEADERS
  };
  request.get(options, (err, httpResponse, body) => {
    if (err)
      return bot.sendMessage(chatId, constants.message.error.CRYPTO_INFO);
    let response = JSON.parse(body);
    if (!response.data)
      return bot.sendMessage(chatId, constants.message.error.CRYPTO_INFO);
    options.encoding = null;
    response.data.forEach(timelinePath => {
      let graphUrl = constants.url.cryptoCurrency.PREFIX + constants.url.cryptoCurrency.CRYPTO_GRAPH_SUFFIX + 
        timelinePath;
      options.url = graphUrl;
      request.get(options, (err, httpResponse, imageBuffer) => {
        bot.sendPhoto(chatId, imageBuffer);
      });
    });
    return;
  });
};
