/**
 * Module to get user's invoice daily
 * @module controllers/itau/dailyInvoice
*/

const bot = require('../../core/gibimbot');
const cron = require('node-cron');
const getInvoice = require('./getInvoice');
const constants = require('../../utils/constants');


module.exports = async (msg, match) => {
  const chatId = msg.chat.id;
  cron.schedule('59 01 * * *', () => {
    getInvoice(msg);
  });
  bot.sendMessage(chatId, constants.message.info.DAILY_INVOICE);
};