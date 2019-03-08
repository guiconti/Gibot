/**
 * Module to bot's voice recognition
 * @module controllers/voice/commandCenter
 */

const constants = require('../../utils/constants');
const path = require('path');
const voicesFolder =  path.join(__dirname, '../../voices');
const recognize = require('./recognize');
const logger = require('../../../tools/logger');

module.exports = bot => {
  bot.on('voice', (msg) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    let options = {
      reply_to_message_id: messageId
    };
    console.log(-1);
    bot.downloadFile(msg.voice.file_id, voicesFolder)
      .then((voicePath) => {
        console.log(0);
        recognize(voicePath)
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
};
