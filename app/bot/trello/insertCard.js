/**
 * Executa a ação de inserir no Trello utilizando as API de listagem.
 * Insere uma card enviada pelo Telegram e executa.
 *
 * @param {string[]} userRequest - Array com todas as informações da requisição (após o /t).
 * @return {Promise.NULL} - Uma promise que resolve caso o card seja inserido
 * @throws {Error} - Rejeita a promise com o erro ocorrido
 */
exports.insertCard = (userRequest) => {

    return new Promise((resolve, reject) => {

        try {

            /*  Monta a URL e form para a requsição */
            var url = TRELLO_PREFIX + userRequest.boardName.trim() + '/' + userRequest.listName.trim() + '/' + TrelloActions.INSERT;

            var cardForm = {
                name: userRequest.cardName.trim()
            };

        } catch(e) {

            return reject(e);

        }
        
        /*  Realiza chamada na API de inserção */
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
