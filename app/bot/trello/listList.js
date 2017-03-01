/**
 * Executa a ação de listar no Trello utilizando as API de listagem.
 * Recebe uma requsição de lista enviada pelo Telegram e executa.
 *
 * @param {string[]} userRequest - Array com todas as informações da requisição (após o /t).
 * @return {Promise.string[]} - Uma promise que resolve todos os cards listados.
 * @throws {Error} - Rejeita a promise com o erro ocorrido
 */
exports.listList = (userRequest) => {

    return new Promise((resolve, reject) => {

        var url;

        try {

            /*  Monta a URL para a requsição */
            url = TRELLO_PREFIX + userRequest.boardName.trim() + '/' + userRequest.listName.trim() + '/' + TrelloActions.LIST;

        } catch(e) {

            return reject(e);

        }

        /*  Realiza chamada na API de listagem */
        request.get({url: url}, (err, httpResponse, cardsNames) => {

            try {

                if (err){

                    return reject(err);

                } else {

                    /*  Tratamos a resposta da API em JSON para um Objeto e enviamos a lista*/
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
}