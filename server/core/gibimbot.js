/**
 * Module to bot's inicialization also responsable for action manangement
 * @module core/gibimbot
 */

/** Requirement of the module used to utilize the Bot in Telegram*/
const TelegramBot = require('node-telegram-bot-api');
const logger = require('../../tools/logger');

/** Bot's token used to validade the access to Gibot or to the used bot */
const token = process.env.NODE_ENV=='development'?process.env.TELEGRAM_DEV_TOKEN:process.env.TELEGRAM_TOKEN;

/** Create the bot and activates the polling to observate new updates */
const bot = new TelegramBot(token, {polling: true});
module.exports = bot;
/**Create the path to store voices */

const path = require('path');
const voicesFolder =  path.join(__dirname, '../voices');

const constants = require('../utils/constants');
const identifyCallback = require('../utils/identifyCallback');

/** Storing the bot's features inside the 'features' variable*/
let features = {};
const featuresPath = process.cwd() + '/server/bot/';
const fs = require('fs');
/** Lists the modules in 'app/bot' and storages the reference inside 'features'*/
fs.readdirSync(featuresPath).forEach( (file) => {
  //  In case we find a folder
  if (file.indexOf('.') == -1) {
    let actualFeature = featuresPath + file;
    fs.readdirSync(actualFeature).forEach( (file) => {
      if (file.indexOf('commandCenter.js') !== -1)
        require(actualFeature + '/' + file)(bot);
    });
  }
});

/** Reddit actions
 * Applies a regex in the /re or /reddit message and if regex matches, sends the request to the reddit module.
 */
bot.onText(/\/reddit (.+)/i || /\/re (.+)/i, features.reddit);

bot.on('callback_query', function (msg) {
  identifyCallback(msg);
});

bot.on('voice', (msg) => {
  const chatId = msg.chat.id;
  const messageId = msg.message_id;
  let options = {
    reply_to_message_id: messageId
  };
  bot.downloadFile(msg.voice.file_id, voicesFolder)
    .then((voicePath) => {
      features.recognize(voicePath)
        .then((transcription) => {
          // Reply to voice with transcription
          bot.sendMessage(chatId, transcription, options);
        })
        .catch((err) => {
          logger.error(err);
          // Reply to voice with transcription error
          bot.sendMessage(chatId, 'Error on voice transcription', options);
        });
    })
    .catch((err) => {
      logger.error(err);
      console.log(err);
      // Reply to voice with transcription error
      bot.sendMessage(chatId, 'Unable to download voice', options);
    });
});