/**
 * Módulo para identificar ações do Reddit
 * @module bot/ragnarok/reddit
 */

//  TODO: Melhorar isso
/**
 * Array para as possíveis variações de cada ação no Trello.
 * @readonly
 * @const {string[]}
 */
const subscribeActions = ['subscribe','subscrib','subscribi', 'sub',];
const newsActions = ['news', 'new', 'novos'];
const subscriptionActions = ['subscription', 'subscriptions'];
const helpActions = ['help', 'h', 'ajuda'];

/**
 * Identifica qual a ação solicitada no Reddit.
 *
 * @param {string} action - Ação a ser verificada
 * @return {string} - Nome da ação normalizado para ser utilizado na requisição
 */
module.exports = (action) => {
  return _.contains(subscribeActions, action)?RedditActions.SUBSCRIBE:
  _.contains(newsActions, action)?RedditActions.NEWS:
  _.contains(subscriptionActions, action)?RedditActions.SUBSCRIPTIONS:
  _.contains(helpActions, action)?RedditActions.HELP:undefined;
};