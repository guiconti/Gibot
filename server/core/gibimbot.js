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

/**Create the path to store voices */

const path = require('path');
const voicesFolder =  path.join(__dirname, '../voices');

const constants = require('../utils/constants');
const identifyCallback = require('../utils/identifyCallback');

/** Storing the bot's features inside the 'features' variable*/
let features = {};
const featuresPath = process.cwd() + '/server/bot';
const fs = require('fs');
/** Lists the modules in 'app/bot' and storages the reference inside 'features'*/
fs.readdirSync(featuresPath).forEach( (file) => {
  if (file.indexOf('.js') !== -1) {
    features[file.split('.')[0]] = require(featuresPath + '/' + file);
  }
});

/** Reddit actions
 *Applies a regex in the /re or /reddit message and if regex matches, sends the request to the iot module.*/
bot.onText(/\/reddit (.+)/i || /\/re (.+)/i, features.reddit);


//HELLO WINSTON
//bot.onText(/./, (msg, match) => {
bot.onText(/^hello winston$/i, (msg, match) => {
  var who_called_me = msg.from.id;
  var primal_rage = 0;
  bot.sendMessage (msg.chat.id, 'Hi there!');
  //bot.sendAudio(msg.chat.id, 'Winston_-_Hi_there.ogg');
  console.log (msg);
  console.log (match);
  bot.onText(/add acc/, (msg, match) => {
    if (msg.from.id == who_called_me){

      bot.sendMessage (msg.chat.id, 'Requesting battle tag:');
      
      bot.onText(/./, (msg,match) => {
        if (msg.from.id == who_called_me){

          console.log (primal_rage);
          //check if input text is a valid abc#1234 :)
          var validBTag = /^(\w){3,12}(#)(\d){4,5}$/.test(msg.text);
          if (validBTag == true){
            if (primal_rage <= 2){
              bot.sendMessage (msg.chat.id, 'Oh, I found it!');
              return;
            } else{
              bot.sendMessage (msg.chat.id, "Ahem. I seem to have, uh, lost my temper. I'm sorry.\n ... I found it.");
              return;
            }
            
          } else if (primal_rage > 2){
            bot.sendSticker(msg.chat.id, 'CAADAgAD1QQAAtJaiAGC1oaOoXnOlwI')
            bot.sendMessage(msg.chat.id, 'wwWRRRROOOOOOOOOAAAAAARRRRGGHHHHH')
          } else{
            bot.sendMessage (msg.chat.id, "Erm... Excuse-me, but I can't seem to find it!");
            primal_rage ++;
          }
        }
        
      });
    }
  });
});
  


/**bot.on('message', function (msg) {

	console.log(msg);
  var chatId = msg.chat.id;
  let likeButton = JSON.stringify({
    type: 'reddit', 
    value: 1
  });
  let dislikeButton = JSON.stringify({
    type: 'reddit',
    value: -1
  });
  let inline_keyboard = [
    [{ text: '\u{1F44D}' , callback_data: likeButton }, { text: '\u{1F44E}' , callback_data: dislikeButton }]
  ];
  let options = {
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
    reply_markup: {inline_keyboard}
  };
  bot.sendMessage(chatId, 'Teste', options)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}); */

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
      // Reply to voice with transcription error
      bot.sendMessage(chatId, 'Unable to download voice', options);
    });
});

module.exports = bot;