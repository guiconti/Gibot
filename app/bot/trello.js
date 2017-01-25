//  TODO: Melhorar isso
var listActions = ['liste','list','listar','lista'];
var insertActions = ['insert','inserir','insere','insira'];

/**
 * Enum para as possíveis ações no Trello.
 * @readonly
 * @enum {string}
 */
var TrelloActions = {
	LIST: 'list',
	INSERT: 'insert'
};

exports.executeTrelloAction = (msg, match) => {

    var chatId = msg.chat.id;

	telegram.middleware.authOwner(msg.from.id).then((authentication) => {

        if (!authentication){

            return bot.sendMessage(chatId, 'Você não possui acesso a putaria.');

        } else {

            try {

                var resp = match[1].split(';');
            
            } catch (e) {

                return bot.sendMessage(chatId, 'Comando do trello inválido. Tente enviar o comando com a seguinte sintaxe: /t "Ação desejada"; "Board desejada"; "Lista desejada";"Card desejada caso queira inserir"');

            }

            if (!telegram.validation.isValidAction(resp)) {

                return bot.sendMessage(chatId, 'Comando do trello inválido. Tente enviar o comando com a seguinte sintaxe: /t "Ação desejada"; "Board desejada"; "Lista desejada";"Card desejada caso queira inserir"');

            } else {

                switch (telegram.trello.identifyAction(resp[0].toLowerCase().trim())) {

                    case TrelloActions.LIST:

                        telegram.trello.listList(resp).then((cards) => {

                            return bot.sendMessage(chatId, cards.msg.join('\n'));

                        }, (err) => {

                            //	TODO: Melhorar isso
                            return bot.sendMessage(chatId, 'Você não possui a combinação de Board e List requisitada.');

                        });

                        break;
                        

                    case TrelloActions.INSERT:

                        if (telegram.validation.isValidCard(resp[3])) {
                
                            telegram.trello.insertCard(resp).then(() => {

                                return bot.sendMessage(chatId, 'Nova card inserida com sucesso meu amigo!');

                            }, (err) => {

                                //	TODO: Melhorar isso
                                return bot.sendMessage(chatId, 'Você não possui a combinação de Board e List requisitada.');

                            });

                        } else {

                            return bot.sendMessage(chatId, 'Card no formato incorreto. Mande a sua card apenas como texto!');

                        }

                        break;


                    default:
                        return bot.sendMessage(chatId, 'Essa ação não é válida. Por enquanto eu sei apenas listar e inserir.');
                        break;

                }
            }
        }
	}, (err) => {

		return bot.sendMessage(chatId, 'Cara, vou ficar te devendo essa, deu algum erro aqui.');

	});

};

exports.identifyAction = (action) => {

    return _.contains(listActions, action)?TrelloActions.LIST:
        _.contains(insertActions, action)?TrelloActions.INSERT:undefined;

};

exports.listList = (userRequest) => {

    return new Promise((resolve, reject) => {

        try {

            var boardName = userRequest[1].trim();
            var listName = userRequest[2].trim();

            var url = TRELLO_PREFIX + boardName + '/' + listName + '/' + TrelloActions.LIST;

        } catch(e) {

            return reject(e);

        }

        request.get({url: url}, (err, httpResponse, cardsNames) => {

            try {

                if (err){

                    return reject(err);

                } else {

                    var cards = JSON.parse(cardsNames);

                    if (!_.isArray(cards.msg)){

                        return reject();

                    } else {

                        return resolve(cards);

                    }

                }

            } catch (e) {

                return reject(e);

            }

        }, (err) => {

            return reject(err);

        });

    });
};

exports.insertCard = (userRequest) => {

    return new Promise((resolve, reject) => {

        try {

            var boardName = userRequest[1].trim();
            var listName = userRequest[2].trim();
            var cardName = userRequest[3].trim();

            var url = TRELLO_PREFIX + boardName + '/' + listName + '/' + TrelloActions.INSERT;

            var cardForm = {
                name: cardName
            };

        } catch(e) {

            return reject(e);

        }
        
        request.post({url: url, form: cardForm}, (err, httpResponse, insertCardJsonResponse) => {

            if (err) {

                return reject(err);

            } else {

                 if (httpResponse.statusCode != 200) {

                    return reject();

                } else {

                    return resolve();

                }

            }

        });

    });

}
