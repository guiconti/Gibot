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
      REGISTER_USER: 'register',
      DELETE_USER: 'delete_user',
      TOP_PICK: 'top_pick'
    },
    cryptoCurrency:{
      HEADERS: {
        'api-key': process.env.CRYPTO_API_KEY
      },
      PREFIX: process.env.CRYPTO_PREFIX,
      CRYPTO_CONVERT_SUFFIX: 'convert_currency',
      CRYPTO_TIMELINE_SUFFIX: '/wallet/timeline',
      CRYPTO_GRAPH_SUFFIX: 'graphs'
    }
  },
  message:{
    error: {
      CALLBACK_INVALID: 'Sorry, we had a problem handling your feedback',
      TOP_PICK_API: 'Sorry we had a problem getting accessing this feature`s API.',
      INVALID_CRYPTO_CURRENCY: 'You sent one or more invalid crypto currency.' +
        '\nThe call should be like /crypto_currency_converter_XRP_to_BTC',
      CRYPTO_INFO: 'Sorry we had a problem accessing this feature`s API.',
      REGISTER_ERROR: 'Eu não consegui realizar a autenticação com os dados enviados. Por favor tente novamente conferindo os dados de autenticação.'
    },
    info: {
      REPLY_MARKUP_SENT: 'Thanks for the feedback!',
      TOP_PICK_RESPONSE: `Here is the top picked heroes in the last week\n`,
      ASK_TYPE: 'Vamos lá! Primeiro me diga qual tipo de integração você quer adicionar.',
      REGISTERING: `Certo, só um momento para eu fazer a sua autenticação aqui.`,
      SEND_CARD: `Show! Me envie o número completo do seu cartão, sem espaços.`,
      SEND_PASSWORD: `Pra finalizar o cadastro preciso que você me envie a sua senha. Obs: recomendo que você apague do histórico da conversa depois de enviar.`
    }
  },
  regex: {
    ITAU_ADD: /add/i || /add card/i || /addcard/i,
    ITAU_CARD_NUMBER: /^\d{16}$/,
    ITAU_PASSWORD: /^\d{4}$|^\d{6}$/,
    CRYPTO_CURRENCY: /\/currency_converter/i || /\/currency_converter(.+)/i,
    CRYPTO_CURRENCY_CONVERTER: /currency_converter_(\S{3})_to_(\S{3})/i,
    CRYPTO_WALLET_TIMELINE: /\/crypto_wallet/i || /\/wallet(.+)/i,
    OVERWATCH_REGISTER_USER: /\/overwatch_register (.+)/i,
    OVERWATCH_TOP_PICK: /\/overwatch_top_pick/i 
    || /\/overwatch_top_pick (.+)/i,
    OVERWATCH_DELETE_USER: /\/overwatch_delete/i
  },
  states: {
    NOT_INITIATED: 0,
    RECEIVE_TYPE: 1,
    RECEIVE_CARD_NUMBER: 2,
    RECEIVE_PASSWORD: 6,
    REGISTERING: 7
  },
  cache: {
    STATE: '_STATE',
    USER_DATA: '_USER_DATA',
    CURRENT_REGISTER_INDEX: '_CURRENT_REGISTER_INDEX'
  },
  itau: {
    types: {
      CREDICARD: 'CREDICARD',
      ITAUCARD: 'ITAUCARD',
      PF: 'PF'
    }
  }
};