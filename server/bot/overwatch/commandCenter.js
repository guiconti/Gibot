/**
 * Module to bot's overwatch action capture
 * @module controllers/overwatch/commandCenter
 */

const constants = require('../../utils/constants');
const topPick = require('./topPick');
const registerUser = require('./registerUser');

module.exports = bot => {
  bot.onText(constants.regex.OVERWATCH_TOP_PICK, topPick);
  bot.onText(constants.regex.OVERWATCH_REGISTER_USER, registerUser);
  bot.onText(constants.regex.OVERWATCH_DELETE_USER, deleteUser);
};
