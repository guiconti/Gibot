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
    battleTag: constants.regex.OVERWATCH_REGISTER_USER.exec(msg.text)[1]
  };
  console.log(body.battleTag);
  request.post({
    url: url,
    json: body,
    headers: headers
  }, (err, httpResponse, body) => {
    //let response = JSON.parse(body.msg);
    //V console.log(body);
    return bot.sendMessage(chatId, body.msg);
    //return bot.sendMessage(chatId, response.msg);
    //return bot.sendMessage(chatId, err);
  });

};
