/**
 * Módulo de ações do Reddit
 * @module bot/reddit
 */

const cron = require('node-cron');
const identifyAction = require('./reddit/identifyAction');
const postsController = require('./reddit/postsController');

/**
 * Valor que armaneza o prefixo a ser utilizado em toda a requisição das APIs do Reddit.
 * @readonly
 * @const {string}
 */
const REDDIT_PREFIX = process.env.NODE_ENV=='development'?'http://localhost:3301/api/':'http://ec2-54-232-231-87.sa-east-1.compute.amazonaws.com:3301/api/';
const SUBSCRIBE_SUFFIX = 'subscribe';
const SUBSCRIPTIONS_SUFFIX = 'subscriptions/'

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
        chatId, 'Subreddit inválido'
      );
      let requestInfo = {
        subreddit: userRequest.subreddit.toLowerCase().trim(),
        chatId: chatId
      };
      let subscribeUrl = REDDIT_PREFIX + SUBSCRIBE_SUFFIX;
      request.post({url: subscribeUrl, json: requestInfo}, (err, httpResponse, html)=>{
        if (err){
          bot.sendMessage(chatId, 'Erro ao se inscrever no subreddit.');
        }
      });
      break;

    case RedditActions.NEWS:
      if (!telegram.validation.isValidString(userRequest.subreddit)) return bot.sendMessage(
        chatId, 'Subreddit inválido'
      );
      getPosts(userRequest.subreddit, chatId);
      break;
      
    case RedditActions.SUBSCRIPTIONS:
      let subscriptionsUrl = REDDIT_PREFIX + SUBSCRIPTIONS_SUFFIX + chatId;
      request.get({url: subscriptionsUrl}, (err, httpResponse, html)=>{
        if (err){
          bot.sendMessage(chatId, 'Erro ao listar as inscrições desse chat.');
        }
      });
      break;

    case RedditActions.HELP:
      let message = 'Essas são as funcionalidades que eu sei fazer por enquanto.\n\n';
      message += 'subscribe "subreddit" - Se inscreve em um subreddit para receber os top posts dele a cada 8 horas.\n\n';
      message += 'news "subreddit" - Retorna todas as últimas notícias ainda não enviada para você desse subreddit. Use isso se você quiser um update imediato do subreddit.\n\n';
      message += 'subscriptions - Retorna todas as suas inscrições ativas'
      return bot.sendMessage(chatId, message);
      break;

    default:
      return bot.sendMessage(chatId, 'Essa ação não é válida. Por enquanto eu sei apenas observar um subreddit.');
      break;
  }
};

function newSubscription(subreddit, chatId, hours){
  cron.schedule('0 */' + hours + ' * * *', function(){
    getPosts(subreddit, chatId);
  });
}

function getPosts(subreddit, chatId){
  subreddit = subreddit.toLowerCase().trim();
  postsController.getNewsFromSubreddit(subreddit, chatId)
  .then((newPosts) => {
    if (newPosts.fail){
      return bot.sendMessage(chatId, newPosts.fail);
    }
    if (newPosts.length == 0){
      return bot.sendMessage(chatId, 'Não há nenhum novo post na primeira página desse subreddit desde a última atualização enviada')
    }
    bot.sendMessage(chatId, 'Novos posts para o subreddit ' + subreddit + '\n\n');
    newPosts.forEach((post) => {
      let verbosePost = post.title + '\n' + post.url + '\n\n';
      bot.sendMessage(chatId, verbosePost);
    });
    return;
  }, (err) => {
    console.log(err);
    return bot.sendMessage(chatId, 'Esse subreddit não é um subreddit existente.');
  });
}