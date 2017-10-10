/**
 * Módulo de inicialização do bot e responsável pelo gerenciamento de ações
 * @module core/gibimbot
 */

/** Requisição do modulo utilizado para utilizar o Bot no Telegram */
const TelegramBot = require('node-telegram-bot-api');
const logger = require('../../tools/logger');

/**  Token do Bot que será utilizado para validar acesso ao Gibot ou o bot a ser utilizado */
const token = process.env.NODE_ENV=='development'?process.env.TELEGRAM_DEV_TOKEN:process.env.TELEGRAM_TOKEN;

/** Cria o bot e ativa o polling para observar sempre novos updates */
const bot = new TelegramBot(token, {polling: true});

/** Cria o path para armazenar as voices*/
const path = require('path');
const voicesFolder =  path.join(__dirname, '../voices');

const constants = require('../utils/constants');

/** Armazenando as features do bot dentro da variavel features. */
let features = {};
const featuresPath = process.cwd() + '/server/bot';
const fs = require('fs');
/** Lista os módulos em app/bot e armazena a referência dentro de features */
fs.readdirSync(featuresPath).forEach( (file) => {
  if (file.indexOf('.js') !== -1) {
    features[file.split('.')[0]] = require(featuresPath + '/' + file);
  }
});

/** Ações do Reddit
 * Aplica um regex na mensagem /re ou /reddit e caso a regex der match envia o pedido para o módulo do iot.  */
bot.onText(/\/reddit (.+)/i || /\/re (.+)/i, features.reddit);

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
  try {
    let jsonResponse = JSON.parse(msg.data);
  } catch(err){
    logger.error(err);
  }

  bot.answerCallbackQuery(msg.id, constants.message.info.REPLY_MARKUP_SENT);
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