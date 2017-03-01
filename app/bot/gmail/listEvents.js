/**
 * Módulo para listar os eventos em um período específico do Gmail
 * @module bot/gmail/listEvents
 */

/**
 * Executa a ação de listar no Gmail utilizando as API de listagem.
 * Recebe uma requsição de lista enviada pelo Telegram e executa.
 *
 * @param {string[]} userRequest - Array com todas as informações da requisição (após o /g).
 * @return {Promise.string[]} - Uma promise que resolve todos os cards listados.
 * @throws {Error} - Rejeita a promise com o erro ocorrido
 */
exports.listEvents= (userRequest) => {

    return new Promise((resolve, reject) => {

        try {

            var days;
            var initialDate;
            var finalDate;

            /*  Pega as informações da requisição */
            if(telegram.validation.isValidDate(userRequest.initialDate)) {

                /** Caso a requsição seja no formato de data */
                initialDate = userRequest.initialDate?userRequest.initialDate.trim():0;
                finalDate = userRequest.finalDate?userRequest.finalDate.trim():0;

            } else {

                /** Caso a requsição seja no formato de dia */
                days = userRequest.initialDate?userRequest.initialDate.trim():0;

            }

            /*  Monta a URL para a requsição */
            var url = GMAIL_PREFIX + GmailActions.LIST + '?days=' + days + '&initialDate=' + initialDate + '&finalDate=' + finalDate;

        } catch(e) {

            return reject(e);

        }

        /*  Realiza chamada na API de listagem */
        request.get({url: url}, (err, httpResponse, eventsList) => {

            try {

                if (err){

                    return reject(err);

                } else {

                    /*  Tratamos a resposta da API em JSON para um Objeto e enviamos a lista*/
                    var events = JSON.parse(eventsList);

                    if (!_.isArray(events.msg)){

                        return reject();

                    } else {

                        verboseEvents = [];

                        events.msg.forEach(function(event){

                            var actualEvent = event.summary + ' ocorrerá ' + moment(event.start).tz('America/Sao_Paulo').calendar() + ' até ' + moment(event.end).tz('America/Sao_Paulo').calendar();

                            verboseEvents.push(actualEvent);

                        });

                        return resolve(verboseEvents);

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
