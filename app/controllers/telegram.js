/*  GLOBAL bot:true */
var ownerChatId = process.env.TELEGRAM_OWNER_ID;

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

    } else if (!_.isNumber(parseInt(body.chatId))) {

        return res.status(400).json({
            msg: 'Not a valid chat id.'
        });

    } else {

        var message = body.message.trim();
        var chatId = parseInt(body.chatId);
        
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

exports.sendPhotoToOwner = (req, res) => {

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
    
}

exports.sendPhotoToChat = (req, res) => {

    if (!req.file){

        return res.status(400).json({
            msg: 'No image was sent.'
        });

    } else {

        var body = _.pick(req.body, 'chatId');

        if (!_.isNumber(parseInt(body.chatId))) {

            return res.status(400).json({
                msg: 'Not a valid chat id.'
            });

        } else {

            var chatId = parseInt(body.chatId);

            const buffer = fs.readFileSync(process.cwd() + '/' + req.file.path);
            bot.sendPhoto(ownerChatId, buffer);

            return res.status(200).json({
                msg: 'ok'
            });
            
        }

    }
}
