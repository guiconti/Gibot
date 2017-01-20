var TelegramBot = require('node-telegram-bot-api');

//  Token do Bot que será utilizado para validar acesso ao Gibimbot ou o bot a ser utilizado
var token = process.env.NODE_ENV=='development'?process.env.TELEGRAM_DEV_TOKEN:process.env.TELEGRAM_TOKEN;

TRELLO_PREFIX = process.env.NODE_ENV=='development'?'http://localhost:3101/trello/':'http://ec2-52-67-130-125.sa-east-1.compute.amazonaws.com:3101/trello/';

//  Cria o bot e ativa o polling para observar sempre novos updates
bot = new TelegramBot(token, { polling: true });

telegram = {};
var telegramPath = process.cwd() + '/app/bot';

//  Get our controllers modules
fs.readdirSync(telegramPath).forEach( (file) => {
    if (file.indexOf('.js') !== -1) {
        telegram[file.split('.')[0]] = require(telegramPath + '/' + file);
    }
});

//	Global variables
TrelloActions = {
	LIST: 'list',
	INSERT: 'insert'
};

//  TODO: Acabar essa imbecilidade
//  Aplica um regex na mensagem grab e caso a regex der match realiza uma ação. Msg sendo a mensagem enviada e match o array de matchs com o regex escolhido
bot.onText(/grab/g, function (msg, match) {

	var chatId = msg.chat.id;

	//  Placeholder
    bot.sendMessage(chatId, 'Fala irmao');

});

//  Aplica um regex na mensagem /trello e caso a regex der match verifica qual o comando pedido. Msg sendo a mensagem enviada e match o array de matchs com o regex escolhido
bot.onText(/\/t (.+)/i, telegram.trello.executeTrelloAction);
bot.onText(/\/trello (.+)/i, telegram.trello.executeTrelloAction);
bot.onText(/\/g (.+)/i, telegram.gmail.insertAppointment);
bot.onText(/\/gmail (.+)/i, telegram.gmail.insertAppointment);

bot.on('message', function (msg) {

	console.log(msg);
	var chatId = msg.chat.id;

});