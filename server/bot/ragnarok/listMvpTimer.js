/**
 * Módulo para listar os timers de MVPs
 * @module bot/ragnarok/listMvpTimer
 */

/* request global:true */

var LIST_SUFFIX = 'mvp/list';

/**
 * Pega no servidor e lista todas os timers conhecidos de MVPs
 *
 * @return {Promise.string[]} - Uma promise que resolve todos os mvps.
 * @throws {Error} - Rejeita a promise com o erro ocorrido
 */
exports.listMvpTimer = () => {

    return new Promise((resolve, reject) => {

        try {

            var url =  RAGNAROK_PREFIX + LIST_SUFFIX;

            request.get({url: url}, (err, httpResponse, body) => {

                if (err) {

                    return reject (err);

                } else {

                    var mvpTimers = JSON.parse(body);

                    if (!_.isArray(mvpTimers.msg)){

                        return reject();

                    } else if (mvpTimers.msg.length == 0){

                        return resolve('Não há respawn de MVPs conhecidos ativos no momento.');

                    } else {

                        var message = 'Lista de MVPs a respawnar';

                        mvpTimers.msg.forEach((mvp) => {

                            message += '\n\nMVP: ' + mvp.name + '\nRespawn: ' + mvp.time;

                        });

                        return resolve(message);

                    } 
                }
            });

        } catch (e) {

            return reject(e);

        }
    });
};
