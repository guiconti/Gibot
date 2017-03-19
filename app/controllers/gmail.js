/**
 * Módulo de APIs do Gmail
 * @module controllers/gmail
 */

/** global auth:true*/
/** global moment:true */
/** global tz:true */
/** global validation:true */

/** Módulo do google API que será utilizado para todas as requisições do gmail */
var google = require('googleapis');
var calendar = google.calendar('v3');

/**
 * Lista todos os eventos do calendário em um período de tempo determinado.
 *
 * @param {express.app.req} req - Informações sobre a requisição da API fornecida pelo express.
 * @param {object} req.params - Parâmetros passados no GET.
 * @param {int} [req.params.days=0] - Diferença de dias para verificar o eventos.
 * @param {date} [req.params.initialDate=Today] - Dia inicial do período em que se deseja verificar os eventos.
 * @param {date} [req.params.finalDate=Today] - Dia final do período em que se deseja verificar os eventos.
 * @param {express.app.res} res - Utilizado na resposta para a requisição gerenciada pelo express.
 */
exports.listEvents = (req, res) => {

    var initialDate;
    var finalDate;

    if (validation.isValidDate(req.query.initialDate) && validation.isValidDate(req.query.finalDate)){

        /** Se o usuário passou datas usaremos a função de período */
        initialDate = moment(req.query.initialDate, 'DD-MM-YYYY').tz('America/Sao_Paulo').startOf('day');
        finalDate = moment(req.query.finalDate, 'DD-MM-YYYY').tz('America/Sao_Paulo').endOf('day');

    } else {

        var days = 0;

        if (validation.isValidNumber(parseInt(req.query.days))) {

            days = parseInt(req.query.days);

        }

        if (days >= 0) {
            
            initialDate = moment().tz('America/Sao_Paulo').startOf('day');
            finalDate = moment().tz('America/Sao_Paulo').add(days, 'days').endOf('day');

        } else {

            initialDate = moment().tz('America/Sao_Paulo').subtract(days * -1, 'days').startOf('day');
            finalDate = moment().tz('America/Sao_Paulo').endOf('day');

        }
        
    }

    listDayEvents(initialDate, finalDate).then((events) => {

        return res.status(200).json({
            msg: events
        });

    }, (err) => {

        return res.status(500).json({
            msg: 'Erro ao capturar os eventos'
        });

    });

};

/**
 * Lista todos os eventos do calendário em um período de tempo determinado.
 *
 * @param {date} initialDate - Dia inicial do período em que se deseja verificar os eventos.
 * @param {date} finalDate - Dia final do período em que se deseja verificar os eventos.
 * @return {Promise.string[]} - Lista com todos os eventos dentro do período.
 * @throws {Error}
 */
function listDayEvents(initialDate, finalDate) {

    return new Promise ((resolve, reject) => {

        calendar.events.list({

            auth: auth,
            calendarId: 'primary',
            timeMin: initialDate.toISOString(),
            timeMax: finalDate.toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime'

        }, function(err, response) {

            if (err) {

                console.log(err);

                /** TODO: Tratar esse erro melhor */
                return reject(err);

            }

            var events = [];

            response.items.forEach(function(event) {

                var actualEvent = {
                    summary: event.summary,
                    start: event.start.dateTime || event.start.date,
                    end: event.end.dateTime || event.end.date
                };

                events.push(actualEvent);

            });

            return resolve(events);

        });
        
    });
}


