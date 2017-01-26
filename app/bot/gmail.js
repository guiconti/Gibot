/**
 * Módulo de ações do Gmail
 * @module bot/gmail
 */

/*  global auth:true*/

/** Módulo do google API que será utilizado para todas as requisições do gmail */
var google = require('googleapis');
var calendar = google.calendar('v3');

exports.insertAppointment = (msg, match) => {

    var chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Oi');

};

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 */
exports.listEvents = () => {

    calendar.events.list({
    auth: auth,
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
    }, function(err, response) {
    if (err) {
        console.log('The API returned an error: ' + err);
        return;
    }
    var events = response.items;
    if (events.length == 0) {
        console.log('No upcoming events found.');
    } else {
        console.log('Upcoming 10 events:');
        for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime || event.start.date;
        console.log('%s - %s', start, event.summary);
        }
    }
    });
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