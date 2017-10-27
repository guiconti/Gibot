/**
 * Module to bot's overwatch action capture
 * @module controllers/overwatch/commandCenter
 */

const constants = require('../../utils/constants');
const topPick = require('./topPick');

module.exports = bot => {
  bot.onText(constants.regex.OVERWATCH_TOP_PICK, topPick);
};
