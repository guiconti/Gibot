/**
 * Módulo de inicialização do bot e responsável pelo gerenciamento de ações
 * @module core/gibimbot
 */

/** Requisição do móduço utilizado para utilizar o Bot no Telegram */
var TelegramBot = require('node-telegram-bot-api');

/**  Token do Bot que será utilizado para validar acesso ao Gibot ou o bot a ser utilizado */
var token = process.env.NODE_ENV=='development'?process.env.TELEGRAM_DEV_TOKEN:process.env.TELEGRAM_TOKEN;

/** Cria o bot e ativa o polling para observar sempre novos updates */
bot = new TelegramBot(token, { polling: true });

/** Cria o path para armazenar as voices*/
const path = require('path');
const voicesFolder =  path.join(__dirname, '../voices');

/** Armazenando na variável global telegram todos os módulos que o bot terá acesso. */
telegram = {};
var telegramPath = process.cwd() + '/app/bot';

/** Lista os módulos em app/bot e armazena a referência dentro de telegram */
fs.readdirSync(telegramPath).forEach( (file) => {
  if (file.indexOf('.js') !== -1) {
    telegram[file.split('.')[0]] = require(telegramPath + '/' + file);
  }
});

/** Captura de ações do Trello. Ativada por /t "comando" ou /trello "comando" 
 * Aplica um regex na mensagem /t ou /trello e caso a regex der match envia o pedido para o módulo do trello.  */
bot.onText(/\/t (.+)/i, telegram.trello.executeTrelloAction);
bot.onText(/\/trello (.+)/i, telegram.trello.executeTrelloAction);

/** Captura de ações do Gmail. Ativada por /g "comando" ou /gmail "comando" 
 * Aplica um regex na mensagem /g ou /gmail e caso a regex der match envia o pedido para o módulo do gmail.  */
bot.onText(/\/g (.+)/i, telegram.gmail.executeGmailAction);
bot.onText(/\/gmail (.+)/i, telegram.gmail.executeGmailAction);

/** Captura de ações do Ragnarok. Ativada por /r "comando" ou /ragnarok "comando" 
 * Aplica um regex na mensagem /r ou /ragnarok e caso a regex der match envia o pedido para o módulo do ragnarok.  */
bot.onText(/\/r (.+)/i, telegram.ragnarok.executeRagnarokAction);
bot.onText(/\/ragnarok (.+)/i, telegram.ragnarok.executeRagnarokAction);

/** Ações de IOT
 * Aplica um regex na mensagem /i ou /iot e caso a regex der match envia o pedido para o módulo do iot.  */
bot.onText(/\/i (.+)/i, telegram.iot.executeIoTAction);
bot.onText(/\/iot (.+)/i, telegram.iot.executeIoTAction);

/** Ações de IOT
 * Aplica um regex na mensagem /re ou /reddit e caso a regex der match envia o pedido para o módulo do iot.  */
bot.onText(/\/reddit (.+)/i || /\/re (.+)/i, telegram.reddit);

/*bot.on('message', function (msg) {

	console.log(msg);
	var chatId = msg.chat.id;

});*/

bot.on('voice', (msg) => {
  const chatId = msg.chat.id;
  const messageId = msg.message_id;
  let options = {
    reply_to_message_id: messageId
  };
  bot.downloadFile(msg.voice.file_id, voicesFolder)
    .then((voicePath) => {
      telegram.recognize(voicePath)
      .then((transcription) => {
        // Reply to voice with transcription
        bot.sendMessage(chatId, transcription, options);
      })
      .catch((err) => {
        // Reply to voice with transcription error
        bot.sendMessage(chatId, 'Error on voice transcription', options);
      })
    })
    .catch((err) => {
      // Reply to voice with transcription error
      bot.sendMessage(chatId, 'Unable to download voice', options);
    })
});