/**
 * Module to bot's itau action capture
 * @module controllers/itau/commandCenter
 */

const typeRegex = require('../../utils/typeRegex');
const retrieveControllers = require('../../utils/retrieveControllers');
const constants = require('../../utils/constants');

const controllers = retrieveControllers(__dirname, __filename);

module.exports = bot => {
  bot.onText(constants.regex.ITAU_ADD, controllers.addCard);
  bot.onText(typeRegex, controllers.askCardNumber);
  bot.onText(constants.regex.ITAU_CARD_NUMBER, controllers.askPassword);
  bot.onText(constants.regex.ITAU_PASSWORD, controllers.registerUser);
  bot.onText(constants.regex.ITAU_INVOICE, controllers.getInvoice);
};
