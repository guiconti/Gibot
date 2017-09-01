const identifyAction = require('./reddit/identifyAction.js');
const postsController = require('./reddit/postsController');

/**
 * Módulo de ações do Reddit
 * @module bot/reddit
 */

/**
 * Valor que armaneza o prefixo a ser utilizado em toda a requisição das APIs do Reddit.
 * @readonly
 * @const {string}
 */
REDDIT_PREFIX = process.env.NODE_ENV=='development'?'http://localhost:3101/reddit/':process.env.SERVER_URL + ':' + process.env.PORT + '/reddit/';

/**
 * Enum para as possíveis ações no Ragnarok.
 * @readonly
 * @enum {string}
 */
RedditActions = {
  SUBSCRIBE: 'subscribe',
  NEWS: 'news',
  SUBSCRIPTIONS: 'subscriptions',
  HELP: 'help'
};

/**
 * Executa uma ação do Reddit utilizando as APIs do mesmo.
 * Receba uma mensagem enviada pelo Telegram, avalia a ação e executa caso tudo esteja de acordo
 *
 * @param {object} msg - Mensagem enviada para o bot solicitando ação no Reddit.
 * @param {object} msg.chat - Informações do chat em que a solicitação aconteceu.
 * @param {integer} msg.chat.id - ID do chat em que a solicitação ocorreu.
 * @param {object} msg.from - Informações sobre a pessoa que realizou a solicitação.
 * @param {integer} msg.from.id - ID da pessoa que solicitou a ação.
 * @param {string[]} match - Array com todas as informações da requisição (após o /reddit).
 * @return {bot.sendMessage} - Retorna a execução da resposta no Telegram.
 */
module.exports = (msg, match) => {
  const chatId = msg.chat.id;

  try {
    let request = match[1].split(' '); 
    userRequest = {       
      action: request[0],
      subreddit: request[1]
    };

  } catch (e) {
    return bot.sendMessage(chatId, 'Comando do reddit inválido. Tente enviar o comando com a seguinte sintaxe: /reddit "Ação desejada"');
  }

  /*  Avaliamos se a ação é uma ação válida do Reddit/bot */
  if (!telegram.validation.isValidRedditAction(userRequest)) return bot.sendMessage(
    chatId, 'Comando do reddit inválido. Tente enviar o comando com a seguinte sintaxe: /reddit "Ação desejada"'
  );

  /*  Verificamos qual a ação solicitada, encaminhamos para a função da ação e enviamos a resposta */
  switch (identifyAction(userRequest.action.toLowerCase().trim())) {
    case RedditActions.SUBSCRIBE:
      if (!telegram.validation.isValidString(userRequest.subreddit)) return bot.sendMessage(
        chatId, 'Invalid subreddit'
      );
      postsController.subscribeToSubreddit(userRequest.subreddit.toLowerCase().trim(), chatId)
        .then((newPosts) => {
          if (newPosts.fail){
            return bot.sendMessage(chatId, newPosts.fail);
          }
          if (newPosts.length == 0){
            return bot.sendMessage(chatId, 'Não há nenhum novo post na primeira página desse subreddit desde a última atualização enviada')
          }
          newPosts.forEach((post) => {
            let verbosePost = post.title + '\n' + post.url + '\n\n';
            bot.sendMessage(chatId, verbosePost);
          });
          return;
        }, (err) => {
          console.log(err);
          return bot.sendMessage(chatId, 'Esse subreddit não é um subreddit existente.');
        });
      break;

    case RedditActions.NEWS:
    if (!telegram.validation.isValidString(userRequest.subreddit)) return bot.sendMessage(
      chatId, 'Invalid subreddit'
    );
    postsController.getNewsFromSubreddit(userRequest.subreddit.toLowerCase().trim(), chatId)
      .then((newPosts) => {
        if (newPosts.fail){
          return bot.sendMessage(chatId, newPosts.fail);
        }
        if (newPosts.length == 0){
          return bot.sendMessage(chatId, 'Não há nenhum novo post na primeira página desse subreddit desde a última atualização enviada')
        }
        newPosts.forEach((post) => {
          let verbosePost = post.title + '\n' + post.url + '\n\n';
          bot.sendMessage(chatId, verbosePost);
        });
        return;
      }, (err) => {
        console.log(err);
        return bot.sendMessage(chatId, 'Esse subreddit não é um subreddit existente.');
      });
      break;
      
    case RedditActions.SUBSCRIPTIONS:
      postsController.getSubscriptions(chatId)
        .then((subscriptions) => {
          if (subscriptions.length == 0){
            return bot.sendMessage(chatId, 'You don`t have any active subscriptions.');
          }
          return bot.sendMessage(chatId, 'Your active subscriptions: ' + subscriptions.join(', '));
        }, (err) => {
          return bot.sendMessage(chatId, 'Um erro ocorreu e não foi possível pegar as suas subscriptions');
        })
      break;

    case RedditActions.HELP:
      let message = 'These are the reddit features that i know right now.\n\n';
      message += 'subscribe "subreddit" - Subscribe to a subreddit to receive the top new posts each 6 hours on your favorite subreddit.\n\n';
      message += 'news "subreddit" - Bring all the news to the subreddit sent. Use this if you want imediate update on the top new posts on a subreddit\n\n';
      message += 'subscriptions - Return all your active subscriptions'
      return bot.sendMessage(chatId, message);
      break;

    default:
      return bot.sendMessage(chatId, 'Essa ação não é válida. Por enquanto eu sei apenas observar um subreddit.');
      break;
  }
};
