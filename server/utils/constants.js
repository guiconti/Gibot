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
      API_KEY: process.env.OVERWATCH_API_KEY,
      PREFIX: process.env.OVERWATCH_PREFIX,
      TOP_PICK: 'top_pick'
    }
  },
  message:{
    error: {
      CALLBACK_INVALID: 'Sorry, we had a problem handling your feedback',
      TOP_PICK_API: 'Sorry we had a problem getting accessing this feature`s API.'
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