/**
 * Module to send messages to a chat V2
 * @module controllers/sendMessageToChatV2
*/
const _ = require('underscore');
const logger = require('../../tools/logger');
const validator = require('../utils/validator');

module.exports = (req, res) => {
  const bot = require('../core/gibimbot');
  let body = _.pick(req.body, 'message', 'data', 'options');
  let params = _.pick(req.params, 'telegram_id');
  if (!body.message && body.data && body.data.item){
    body.message = body.data.item.title;
  }

  if (!validator.isValidString(body.message)) {
    return res.status(400).json({
        msg: 'Not a valid message.'
    });
  }
  if (!validator.isValidNumber(parseInt(params.telegram_id))) {
    return res.status(400).json({
        msg: 'Not a valid chat id.'
    });
  }
  let message = body.message.trim();
  let chatId = parseInt(params.telegram_id);
  bot.sendMessage(chatId, message, body.options)
    .then((response) => {
      return res.status(200).json({
          msg: 'Message sent.'
      });
    })
    .catch((err) => {
      logger.error(err);
      return res.status(400).json({
          data: 'Chat não existe'
      });
  });
};