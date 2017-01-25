var TelegramBot = require('node-telegram-bot-api');

//  Token do Bot que será utilizado para validar acesso ao Gibimbot ou o bot a ser utilizado
var token = process.env.NODE_ENV=='development'?process.env.TELEGRAM_DEV_TOKEN:process.env.TELEGRAM_TOKEN;

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

//  Aplica um regex na mensagem /trello e caso a regex der match verifica qual o comando pedido. Msg sendo a mensagem enviada e match o array de matchs com o regex escolhido
bot.onText(/\/t (.+)/i, telegram.trello.executeTrelloAction);
bot.onText(/\/trello (.+)/i, telegram.trello.executeTrelloAction);
bot.onText(/\/g (.+)/i, telegram.gmail.insertAppointment);
bot.onText(/\/gmail (.+)/i, telegram.gmail.insertAppointment);

/*bot.on('message', function (msg) {

	console.log(msg);
	var chatId = msg.chat.id;

});*/