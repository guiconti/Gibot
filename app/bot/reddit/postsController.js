/**
 * Módulo para observar um subreddit para um canal
 * @module bot/reddit/subscribeToSubreddit
 */
const _ = require('underscore');
const FRONT_PAGE_SUFFIX = 'frontPage';
//  TODO: Send this a database Haha
let savedPosts = [];

/**
 * Envia as novidades de um subreddit para um canal
 *
 * @param {string[]} userRequest - Array com todas as informações da requisição (após o /reddit).
 * @return {Promise.NULL} - Uma promise que resolve caso o timer seja inserido
 * @throws {Error} - Rejeita a promise com o erro ocorrido
 */
function subscribeToSubreddit(subreddit, chatId) {
  return new Promise((resolve, reject) => {
    try {
      if (savedPosts[subreddit]){
        if (savedPosts[subreddit].subscriptions.includes(chatId)){
          let message = {
            fail: 'Você já se inscreveu nesse subreddit.\n'
          };
          message.fail += 'Se você quiser receber as novidades agora desse subreddit "/reddit news (subreddit)" without ()';
          return resolve(message);
        }
        savedPosts[subreddit].subscriptions.push(chatId);
      } else {
        savedPosts[subreddit] = {
          name: subreddit,
          posts: [],
          subscriptions: [chatId]
        };
      }
      getPostsFromSubreddit(subreddit).then((formattedPosts) => {
        let newPosts = getNewPosts(subreddit, formattedPosts);
        savedPosts[subreddit].posts = formattedPosts;
        return resolve(newPosts);
      }, (err) => {
        return reject(err);
      });
    } catch (err) {
      return reject(err);
    }
  });
};

function getNewsFromSubreddit(subreddit, chatId) {
  return new Promise((resolve, reject) => {
    getPostsFromSubreddit(subreddit).then((formattedPosts) => {
      let newPosts = getNewPosts(subreddit, formattedPosts);
      return resolve(newPosts);
    }, (err) => {
      return reject(err);
    });
  });
};

function getPostsFromSubreddit(subreddit) {
  return new Promise((resolve, reject) => {
    let url = REDDIT_PREFIX + subreddit + '/' + FRONT_PAGE_SUFFIX;
    request.get({url: url}, (err, httpResponse, frontPageJSON) => {

      if (err) return reject(err);
      let frontPage = JSON.parse(frontPageJSON);
      if (frontPage.error) return reject(err);

      let formattedPosts = [];
      frontPage.msg.forEach((post) => {
        let newPost = {
          id: post.data.id,
          title: post.data.title,
          url: post.data.url
        };
        formattedPosts.push(newPost);
      });
      return resolve(formattedPosts);
    });
  });
}

function getNewPosts(subreddit, newPosts) {
  if (!savedPosts[subreddit].posts){
    return newPosts;
  }
  let postsToSend = [];
  newPosts.forEach((post) => {
    if (savedPosts[subreddit].posts.findIndex((savedPost) => {
      return savedPost.id == post.id;
    }) == -1){
      postsToSend.push(post);
    }
  });
  return postsToSend;
}

function getSubscriptions(chatId) {
  return new Promise((resolve, reject) => {
    try {
      let subscriptions = [];
      for (let key in savedPosts){
        if (savedPosts[key].subscriptions.includes(chatId)){
          subscriptions.push(key);
        }
      }
      return resolve(subscriptions);
    } catch (err) {
      console.log(err);
      return reject(err);
    }
  });
}

module.exports = {
  subscribeToSubreddit: subscribeToSubreddit,
  getNewsFromSubreddit: getNewsFromSubreddit,
  getSubscriptions: getSubscriptions
};
