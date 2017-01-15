var TelegramBot = require('node-telegram-bot-api');

//  Token do Bot que será utilizado para validar acesso ao Gibimbot ou o bot a ser utilizado
var token = process.env.TELEGRAM_TOKEN;

//  ID do telegram que será o dono desse bot, utilizado para validar ações privadas
var myTelegramId = process.env.TELEGRAM_OWNER_ID;

//  Cria o bot e ativa o polling para observar sempre novos updates
var bot = new TelegramBot(token, { polling: true });

//  TODO: Acabar essa imbecilidade
//  Aplica um regex na mensagem grab e caso a regex der match realiza uma ação. Msg sendo a mensagem enviada e match o array de matchs com o regex escolhido
bot.onText(/grab/g, function (msg, match) {

  var chatId = msg.chat.id;

  //  Placeholder
  bot.sendMessage(chatId, 'Fala irmao');
});

//  Aplica um regex na mensagem /trello e caso a regex der match verifica qual o comando pedido. Msg sendo a mensagem enviada e match o array de matchs com o regex escolhido
bot.onText(/\/trello (.+)/, function (msg, match) {

  var chatId = msg.chat.id;

  if (msg.from.id == myTelegramId){

    bot.sendMessage(chatId, 'Futuro projeto inserido!');

  } else {

    bot.sendMessage(chatId, 'Você não é Gibimba.');

  }

  //var resp = match[1];

});

/*bot.onText(/\/trello/g, function (msg, match) {

  var chatId = msg.chat.id;
  var resp = 'Enviem /trello "Nome da board" "'

  bot.sendMessage(chatId, resp);
});*/


/*bot.on('message', function (msg) {
  var chatId = msg.chat.id;

  bot.sendMessage(chatId, "Calma la papai que eu to vendo aqui");
});*/