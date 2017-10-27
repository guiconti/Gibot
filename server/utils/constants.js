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
      SUBSCRIPTIONS_SUFFIX: 'subscriptions/',
      RATE_SUFFIX: 'rate'
    },
    OVERWATCH: {
      PREFIX: process.env.OVERWATCH_PREFIX,
      TOP_PICK: 'top_pick'
    }
  },
  message:{
    error: {
      CALLBACK_INVALID: 'Sorry, we had a problem handling your feedback'
    },
    info: {
      REPLY_MARKUP_SENT: 'Thanks for the feedback!'
    }
  },
  regex: {
    OVERWATCH_TOP_PICK: /\/overwatch_top_pick/i 
      || /\/overwatch_top_pick (.+)/i 
  }
}