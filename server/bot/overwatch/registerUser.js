/**
 * Module to bot's overwatch action capture
 * @module controllers/overwatch/commandCenter
*/

const bot = require('../../core/gibimbot');
const logger = require('../../../tools/logger');
const request = require('request');
const constants = require('../../utils/constants');

module.exports = (msg, match) => {
  let chatId = msg.chat.id;
  let url = constants.url.overwatch.PREFIX + constants.url.overwatch.REGISTER_USER;
  let headers = constants.url.overwatch.HEADERS;
  let body = {
    id: msg.from.id,
    battletag: "miake#12345"
  };

  request.post({
    url: url,
    json: body,
    headers: headers
  }, (err, httpResponse, body) => {
    let response = JSON.parse(body);
    console.log('resp msg: ');
    return bot.sendMessage(chatId, response.msg);
    return bot.sendMessage(chatId, err);
  });

};
