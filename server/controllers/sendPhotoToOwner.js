/**
 * Module to send photos to the bot owner
 * @module controllers/sendPhotoToOwner
*/
const fs = require('fs');
const ownerChatId = process.env.TELEGRAM_OWNER_ID;

module.exports = (req, res) => {
  const bot = require('../core/gibimbot');
  if (!req.file){
    return res.status(400).json({
        msg: 'No image was sent.'
    });
  } else {
    const buffer = fs.readFileSync(process.cwd() + '/' + req.file.path);

    bot.sendPhoto(ownerChatId, buffer);
    res.status(200).json({
        msg: 'ok'
    });
  }  
};
