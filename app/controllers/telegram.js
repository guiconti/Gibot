/*  GLOBAL bot:true */

var ownerChatId = process.env.TELEGRAM_CHAT_ID;

exports.sendMessageToOwner = (req, res) => {

    var body = _.pick(req.body, 'message');

    if (!validation.isValidString(body.message)) {

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
