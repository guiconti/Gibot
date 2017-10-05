/**
 * Module to send photos to the a chat id
 * @module controllers/sendPhotoToChat
*/

const fs = require('fs');
const _ = require('underscore');
const validator = require('../utils/validator');
const ownerChatId = process.env.TELEGRAM_OWNER_ID;

module.exports = (req, res) => {
  const bot = require('../core/gibimbot');
  if (!req.file){
    return res.status(400).json({
        msg: 'No image was sent.'
    });
  } else {
    let body = _.pick(req.body, 'chatId');

    if (!validator.isValidNumber(parseInt(body.chatId))) {
      return res.status(400).json({
          msg: 'Not a valid chat id.'
      });
    } else {
      let chatId = parseInt(body.chatId);
      const buffer = fs.readFileSync(process.cwd() + '/' + req.file.path);
      bot.sendPhoto(ownerChatId, buffer);

      return res.status(200).json({
          msg: 'ok'
      }); 
    }
  }
}
