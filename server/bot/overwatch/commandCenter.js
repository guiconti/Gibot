/**
 * Module to bot's overwatch action capture
 * @module controllers/overwatch/commandCenter
 */

const constants = require('../../utils/constants');
const topPick = require('./topPick');
const btAdd = require('./btAdd');

module.exports = bot => {
  bot.onText(constants.regex.OVERWATCH_TOP_PICK, topPick);
  bot.onText(constants.regex.OVERWATCH_BT_ADD, btAdd);
};
