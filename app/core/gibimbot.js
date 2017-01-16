var TelegramBot = require('node-telegram-bot-api');

//  Token do Bot que será utilizado para validar acesso ao Gibimbot ou o bot a ser utilizado
var token = process.env.TELEGRAM_TOKEN;

//  ID do telegram que será o dono desse bot, utilizado para validar ações privadas
var ownerTelegramId = process.env.TELEGRAM_OWNER_ID;
var michelTelegramId = process.env.TELEGRAM_MICHEL_ID;

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

	//	TODO: Melhorar isso
	if (msg.from.id == ownerTelegramId || msg.from.id == michelTelegramId){

		var resp = match[1].split(' ');

		if (resp.length < 1){

			bot.sendMessage(chatId, 'Argumentos insuficientes para qualquer acao do trello')

		} else {

			var action = resp[0].toLowerCase();

			if (validation.isListAction(action)) {

				if (resp.length < 3) {

					bot.sendMessage(chatId, 'Preciso que voce me manda o nome da board e o nome da list!')

				} else {

					var boardName = resp[1].trim().toLowerCase();
					var listName = resp[2].trim().toLowerCase();

					var userToken;

					var url = 'http://localhost:3101/trello/' + boardName + '/' + listName + '/list';

					request.get({url: url}, (err, httpResponse, cardsNames) => {

						var cards = JSON.parse(cardsNames);

						bot.sendMessage(chatId, cardsNames);

					}, (err) => {

						//	TODO: Verificar se foi a board ou a lista
						bot.sendMessage(chatId, 'O nome da board ou o nome da lista não existem para esse usuário.')

					});

				}

			} else if (validation.isInsertAction(action)){

				bot.sendMessage(chatId, 'Perae que to fazendo esse.')

			} else {

				bot.sendMessage(chatId, 'Esse comando eu não conheço, queridão.')

			}

		}

	} else {

		bot.sendMessage(chatId, 'Você não é Gibimba.');

	}

});

/*bot.onText(/\/trello/g, function (msg, match) {

  var chatId = msg.chat.id;
  var resp = 'Enviem /trello "Nome da board" "'

  bot.sendMessage(chatId, resp);
});*/


/*bot.on('message', function (msg) {

	console.log(msg);
	var chatId = msg.chat.id;
	bot.sendMessage(chatId, "Valeu viado");

});*/