/**
 * Module to send messages to owner
 * @module controllers/sendMessageToOwner
*/

const _ = require('underscore');
const ownerChatId = process.env.TELEGRAM_OWNER_ID;
const validator = require('../utils/validator');

module.exports = (req, res) => {
  const bot = require('../core/gibimbot');
  let body = _.pick(req.body, 'message');

  if (!validator.isValidString(body.message)) {
    return res.status(400).json({
        msg: 'Not a valid message.'
    });
  } else {
    var message = body.message.trim();     
    //  TODO: Change this when we move the bot to another server
    bot.sendMessage(ownerChatId, message);
    return res.status(200).json({
        msg: 'Message sent.'
    });
  }
};
