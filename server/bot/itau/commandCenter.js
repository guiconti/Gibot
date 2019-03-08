/**
 * Module to bot's itau action capture
 * @module controllers/itau/commandCenter
 */

const typeRegex = require('../../utils/typeRegex');
const constants = require('../../utils/constants');

const fs = require('fs');
const path = require('path');
let controllers = [];

fs.readdirSync(__dirname).forEach(file => {
  if (file.indexOf('.') !== -1 && file !== path.basename(__filename))
    controllers[file.split('.')[0]] = require(__dirname + '/' + file);
});

module.exports = bot => {
  bot.onText(constants.regex.ITAU_ADD, controllers.addCard);
  bot.onText(typeRegex, controllers.askCardNumber);
  bot.onText(constants.regex.ITAU_CARD_NUMBER, controllers.askPassword);
  bot.onText(constants.regex.ITAU_PASSWORD, controllers.registerUser);
};