/**
 * All project constants
 * @module utils/constants
 */
//  TODO: Split constant with better scope
module.exports = {
  url: {
    REDDIT: {
      PREFIX: process.env.REDDIT_PREFIX,
      SUBSCRIBE_SUFFIX: 'subscribe',
      SUBSCRIPTIONS_SUFFIX: 'subscriptions/'
    }
  },
  message:{
    info: {
      REPLY_MARKUP_SENT: 'Thanks for the feedback!'
    }
  }
}