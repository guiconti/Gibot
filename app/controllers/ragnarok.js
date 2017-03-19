/**
 * Módulo de APIs do Ragnarok
 * @module controllers/ragnarok
 */

/** global moment:true */
/** global tz:true */

/**
 * Importa a lista de MVPs
 */
var mvpList = require(process.cwd() + '/app/utils/mvpEnum');
var mvpTimers = [];

/**
 * Insere um novo timer de MVP.
 *
 * @param {express.app.req} req - Informações sobre a requisição da API fornecida pelo express.
 * @param {object} req.params - Parâmetros passados no GET.
 * @param {int} [req.body.mvpName] - Nome do MVP que foi morto
 * @param {date} [req.body.killTime=Now] - Hora e minuto que o MVP foi morto 
 * @param {express.app.res} res - Utilizado na resposta para a requisição gerenciada pelo express.
 */
exports.insertMvpTimer = (req, res) => {

    var body = _.pick(req.body, 'mvpName', 'killTime');

    if (!validation.isValidString(body.mvpName)) {

        return res.status(400).json({
            msg: 'Insira um nome de MVP.'
        });

    } else if(!validation.isValidTime(body.killTime)) {

        return res.status(400).json({
            msg: 'Data em forma incorreta. A data tem que estar no formato HH:MM/H:MM'
        });

    } else {

        var mvpInfo = getMvpInfo(body.mvpName.toLowerCase());

        if (mvpInfo) {

            var newMvpTime = {
                name: mvpInfo.name,
                time: fixMvpTime(body.killTime, mvpInfo.hours, mvpInfo.minutes)
            };

            var message = 'Time do MVP ' + newMvpTime.name + ' foi inserido. O seu próximo respawn ocorrerá às ' + newMvpTime.time;

            mvpTimers.push(newMvpTime);

            return res.status(200).json({
                msg: message
            });

        } else {

            return res.status(400).json({
                msg: 'Nome do MVP não se encontra na lista'
            });

        }

    }

};

/**
 * Lista todos os timers de MVPs.
 *
 * @param {express.app.req} req - Informações sobre a requisição da API fornecida pelo express.
 * @param {express.app.res} res - Utilizado na resposta para a requisição gerenciada pelo express.
 */
exports.listMvpTimer = (req, res) => {

    var message = 'Lista de MVPs a respawnar\n';

    mvpTimers = mvpTimers.filter((mvp) => {

        return moment(mvp.time, 'hh:mm').add('11', 'minutes').isAfter(moment());

    });

    mvpTimers.forEach((mvp) => {

        message += '\n\nMVP: ' + mvp.name + '\nRespawn: ' + mvp.time;

    });

    return res.status(200).json({msg: message});

};

function getMvpInfo (userMvpName) {

    return mvpList.find((mvp) => {

        return mvp.namePossibilities.includes(userMvpName);

    });

}

function fixMvpTime (userMvpTime, mvpRespawnTimeHour, mvpRespawnTimeMinutes) {

    return moment(userMvpTime, 'hh:mm').add({hours: mvpRespawnTimeHour, minutes: mvpRespawnTimeMinutes}).format('LT');

}
