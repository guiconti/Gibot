/**
 * Módulo de APIs do Ragnarok
 * @module controllers/ragnarok
 */

/** global moment:true */
/** global tz:true */

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

    res.status(200).json({msg: 'Insert'});

};

/**
 * Lista todos os timers de MVPs.
 *
 * @param {express.app.req} req - Informações sobre a requisição da API fornecida pelo express.
 * @param {express.app.res} res - Utilizado na resposta para a requisição gerenciada pelo express.
 */
exports.listMvpTimer = (req, res) => {

    res.status(200).json({msg: 'Timer!'});

};
