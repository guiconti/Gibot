/**
 * Module to bot's itau action capture
 * @module controllers/itau/commandCenter
 */

const addCard = require('./addCard');
const askCardNumber = require('./askCardNumber');
const typeRegex = require('../../utils/typeRegex');
const constants = require('../../utils/constants');

module.exports = bot => {
  bot.onText(constants.regex.ITAU_ADD, addCard);
  bot.onText(typeRegex, askCardNumber);
 // bot.onText(constants.regex.ITAU_CARD_NUMBER, askPassword);
};
