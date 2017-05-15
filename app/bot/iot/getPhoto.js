/**
 * Módulo para tirar uma foto do quarto do Gibimba
 * @module bot/gmail/listEvents
 */

/**
 * Executa a ação de listar no IoT utilizando as API de listagem.
 * Recebe uma requsição de lista enviada pelo Telegram e executa.
 *
 * @param {string[]} userRequest - Array com todas as informações da requisição (após o /i).
 * @return {Promise.string[]} - Uma promise que resolve todos os cards listados.
 * @throws {Error} - Rejeita a promise com o erro ocorrido
 */
exports.getPhoto = (userRequest) => {

    return new Promise((resolve, reject) => {

        try {

            /*  Monta a URL para a requsição */
            var url = IOT_PREFIX + IoTActions.PHOTO;    

            /*  Realiza chamada na API de listagem */
            //request.get({url: url}, (err, httpResponse, image) => {
            request(url).on('error', function(err) {

                return reject(err);
            
            }).pipe(fs.createWriteStream(process.cwd() + '/image/room.jpg')).on('close', function(){

                return resolve();

            });

        } catch(e) {

            return reject(e);

        }

    }, (err) => {

        return reject(err);

    });
};
