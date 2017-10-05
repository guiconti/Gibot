/**
 * Módulo para inserir timer de mvp no Ragnarok API
 * @module bot/ragnarok/insertMvpTimer
 */

var INSERT_SUFFIX = 'mvp/insert';

/**
 * Insere um timer de mvp enviada pelo Telegram e executa.
 *
 * @param {string[]} userRequest - Array com todas as informações da requisição (após o /r).
 * @return {Promise.NULL} - Uma promise que resolve caso o timer seja inserido
 * @throws {Error} - Rejeita a promise com o erro ocorrido
 */
exports.insertMvpTimer = (userRequest) => {

    return new Promise((resolve, reject) => {

        try {

            /*  Monta a URL e form para a requsição */
            var url = RAGNAROK_PREFIX + INSERT_SUFFIX;

            var mvpForm = {
                mvpName: userRequest.mvpName.trim(),
                killTime: userRequest.killTime.trim()
            };

             /*  Realiza chamada na API de inserção */
            request.post({url: url, form: mvpForm}, (err, httpResponse, insertMvpJsonResponse) => {

                if (err) {

                    return reject(err);

                } else {

                    var message = JSON.parse(insertMvpJsonResponse);

                    if (httpResponse.statusCode != 200) {

                        return reject(message.msg);

                    } else {

                        if (message.msg) {

                            return resolve(message.msg);

                        } else {

                            return resolve('Timer do MVP inserido!');
                            
                        }
                    }
                }
            });

        } catch (e) {

            return reject();

        }

    });

};