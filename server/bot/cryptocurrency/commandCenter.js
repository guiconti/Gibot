/**
 * Module to bot's overwatch action capture
 * @module controllers/overwatch/commandCenter
 */

const constants = require('../../utils/constants');
const getCryptoInfo = require('./getCryptoInfo');

module.exports = bot => {
  bot.onText(constants.regex.CRYPTO_CURRENCY, getCryptoInfo);
};
