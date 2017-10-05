/**
 * Módulo de APIs do Reddit
 * @module controllers/bitcoin
 */

/** global request:true */
const validation = require('../utils/validation');

/** URL para API do reddit */
const REDDIT_URL_PREFIX = 'https://www.reddit.com/r/';
const REDDIT_URL_SUFFIX = '.json';

/**
 * Retorna os posts da primeira página de um Subreddit
 *
 * @param {express.app.req} req - Informações sobre a requisição da API fornecida pelo express.
 * @param {express.app.res} res - Utilizado na resposta para a requisição gerenciada pelo express.
 */

exports.getFrontPage = (req, res) => {

  let body = _.pick(req.params, 'subreddit');
  if (!validation.isValidString(body.subreddit)) return res.status(400).json({
    error: 'Subreddit informado não é válido.'
  });

  request.get({url: REDDIT_URL_PREFIX + body.subreddit + REDDIT_URL_SUFFIX}, function(err, httpResponse, html) {
    if (err) {
      return res.status(400).json({
        error: 'Subreddit informado não existe.'
      });
    }
    try {
      let subredditInfo = JSON.parse(html);
      if (subredditInfo.error) return res.status(400).json({
        error: 'Subreddit informado não existe.'
      });
      if (subredditInfo.data.children.length == 0){
        return res.status(400).json({
          error: 'Subreddit informado não existe.'
        });
      }
      return res.status(200).json({
        msg: subredditInfo.data.children
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: 'Subreddit informado não existe.'
      });
    } 
  });
};