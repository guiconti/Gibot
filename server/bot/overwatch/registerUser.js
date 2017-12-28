/**
 * Module to bot's overwatch action capture
 * @module controllers/overwatch/commandCenter
*/

const bot = require('../../core/gibimbot');
const logger = require('../../../tools/logger');
const request = require('request');
const constants = require('../../utils/constants');

module.exports = (msg, match) => {
  console.log('entrou aqui');

  let chatId = msg.chat.id;
  let url = constants.url.overwatch.PREFIX + constants.url.overwatch.REGISTER_USER;
  let headers = constants.url.overwatch.HEADERS;

  request.post({url: url, headers: headers}, (err, httpResponse, body) => {
    let response = JSON.parse(body);
    console.log(response.msg);
    return bot.sendMessage(chatId, response.msg);
  });

};
