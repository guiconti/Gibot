/**
 * Module to bot's overwatch action capture
 * @module controllers/overwatch/commandCenter
 */

const constants = require('../../utils/constants');
const getCryptoInfo = require('./convertCurrency');
const walletTimeline = require('./walletTimeline');
const getCoinFullForm = require('./getCoinFullForm');

module.exports = bot => {
  bot.onText(constants.regex.CRYPTO_CURRENCY, getCryptoInfo);
  bot.onText(constants.regex.CRYPTO_WALLET_TIMELINE, walletTimeline);
  bot.onText(constants.regex.CRYPTO_FULL_FORM, getCoinFullForm);
};
