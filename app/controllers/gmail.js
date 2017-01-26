/**
 * Módulo de APIs do Gmail
 * @module controllers/gmail
 */

/** global auth:true*/
/** global moment:true */

/** Módulo do google API que será utilizado para todas as requisições do gmail */
var google = require('googleapis');
var calendar = google.calendar('v3');

/** Módulos do moment para trabalharmos com datas */
var tz = require('moment-timezone');

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
        return res.status(200).json({
            msg: 'Toneladas de eventos'
        });

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

exports.insertEvent = (req, res) => {
    /*var event = {
        'summary': 'Google I/O 2015',
        'location': '800 Howard St., San Francisco, CA 94103',
        'description': 'A chance to hear more about Google\'s developer products.',
        'start': {
            'dateTime': '2017-02-03T09:00:00-07:00',
            'timeZone': 'America/Los_Angeles',
        },
        'end': {
            'dateTime': '2017-02-04T17:00:00-07:00',
            'timeZone': 'America/Los_Angeles',
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'attendees': [
            {'email': 'lpage@example.com'},
            {'email': 'sbrin@example.com'},
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10},
            ],
        },
    };
    calendar.events.insert({
        auth: auth,
        calendarId: 'primary',
        resource: event
    }, function(err, response) {

        if(err) {

            console.log(err);

        } else {

            console.log(response);

        }

    });*/
}

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
};


