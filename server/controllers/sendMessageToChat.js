/**
 * Module to send messages to a chat
 * @module controllers/sendMessageToChat
*/
const _ = require('underscore');
const logger = require('../../tools/logger');
const validator = require('../utils/validator');

module.exports = (req, res) => {
  const bot = require('../core/gibimbot');
  let body = _.pick(req.body, 'message', 'chatId', 'options');
  if (!validator.isValidString(body.message)) {
    return res.status(400).json({
        msg: 'Not a valid message.'
    });
  } else if (!validator.isValidNumber(parseInt(body.chatId))) {
    return res.status(400).json({
        msg: 'Not a valid chat id.'
    });
  } else {
    let message = body.message.trim();
    let chatId = parseInt(body.chatId);
    bot.sendMessage(chatId, message, body.options)
      .then((response) => {
        return res.status(200).json({
            msg: 'Message sent.'
        });
      })
      .catch((err) => {
        logger.error(err);
        console.log(err);
        return res.status(400).json({
            data: 'Chat não existe'
        });
    });
  }
};