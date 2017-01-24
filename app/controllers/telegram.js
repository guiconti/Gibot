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

exports.sendMessageToChat = (req, res) => {

    var body = _.pick(req.body, 'message', 'chatId');

    if (!validation.isValidString(body.message)) {

        return res.status(400).json({
            msg: 'Not a valid message.'
        });

    } else if (!_.isNumber(body.chatId)) {

        return res.status(400).json({
            msg: 'Not a valid chat id.'
        });

    } else {

        var message = body.message.trim();
        var chatId = body.chatId;
        
        //  TODO: Change this when we move the bot to another server
        bot.sendMessage(chatId, message).then((response) => {

            return res.status(200).json({
            msg: 'Message sent.'

        });

        }, (e) => {

            return res.status(400).json({
                data: 'Chat não existe'
            });

        });

    }

};
