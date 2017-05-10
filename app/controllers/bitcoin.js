/**
 * Módulo de APIs do Bitcoin
 * @module controllers/bitcoin
 */

/** global request:true */

/** URL para API do blockchain */
const EXCHANGE_URL_PREFIX = 'http://api.coindesk.com/v1/bpi/currentprice/';
const EXCHANGE_URL_SUFFIX = '.json';

/**
 * Retorna os Exchange Rate do Bitcoin para o Real no momento
 *
 * @param {express.app.req} req - Informações sobre a requisição da API fornecida pelo express.
 * @param {express.app.res} res - Utilizado na resposta para a requisição gerenciada pelo express.
 */

exports.bitcoinExchangeRates = (req, res) => {

    var body = _.pick(req.params, 'currency');

    var currency = body.currency?body.currency.trim().length > 0?body.currency.toUpperCase():'BRL':'BRL';

    request.get({url: EXCHANGE_URL_PREFIX + currency + EXCHANGE_URL_SUFFIX}, function(err, httpResponse, html) {

        if (err) {

            return res.status(400).json({
                msg: 'Moeda informada não existe.'
            });

        }

        try {

            var exchangeRates = JSON.parse(html);

            return res.status(200).json({
                msg: exchangeRates.bpi[currency].rate
            });

        } catch (e) {

            return res.status(500).json({
                msg: 'Moeda informada não existe.'
            });
        } 
    });
};