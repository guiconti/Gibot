/**
 * All project constants
 * @module utils/constants
 */
//  TODO: Split constant with better scope
module.exports = {
  url: {
    reddit: {
      PREFIX: process.env.REDDIT_PREFIX,
      SUBSCRIBE_SUFFIX: 'subscribe',
      SUBSCRIPTIONS_SUFFIX: 'subscriptions/',
      RATE_SUFFIX: 'rate'
    },
    overwatch: {
      HEADERS: {
        'api-key': process.env.OVERWATCH_API_KEY
      },
      PREFIX: process.env.OVERWATCH_PREFIX,
      TOP_PICK: 'top_pick'
    },
    cryptoCurrency:{
      PREFIX: process.env.CRYPTO_PREFIX,
      CRYPTO_INFO_SUFFIX: '/info'
    }
  },
  message:{
    error: {
      CALLBACK_INVALID: 'Sorry, we had a problem handling your feedback',
      TOP_PICK_API: 'Sorry we had a problem getting accessing this feature`s API.',
      CRYPTO_INFO: 'Sorry we had a problem accessing this feature`s API.'
    },
    info: {
      REPLY_MARKUP_SENT: 'Thanks for the feedback!'
    }
  },
  regex: {
    OVERWATCH_TOP_PICK: /\/overwatch_top_pick/i 
      || /\/overwatch_top_pick (.+)/i,
    CRYPTO_CURRENCY: /\/bitcoin/i || /\/bitcoin (.+)/i
  }
}