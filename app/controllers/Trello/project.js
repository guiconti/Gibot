var listUrlPrefix = 'https://api.trello.com/1/lists/';

exports.insertCard = (req, res) => {
    
    var body = _.pick(req.body, 'name', 'description');
    var toValidateFields = _.pick(req.body, 'description');

    if (!validation.isValidString(body.name)) {

        return res.status(400).json({
            msg: 'Name is not valid.'
        });

    } else {

        var boardName = req.params.boardName;
        var listName = req.params.listName;
    
        trelloUtils.getBoardListId(boardName, listName).then((boardId) => {

            var cardInfo = {
                name: body.name
            };

            if (validation.isValidString(toValidateFields.description)) {

                cardInfo.description = toValidateFields.description;

            }

            var url = listUrlPrefix + '/' + boardId + '/cards?' + authenticationTrelloSuffix;

            request.post({url: url, form: cardInfo}, (err, httpResponse, jsonResponse) => {

                if (!trelloUtils.validateCreation(jsonResponse)){

                    return res.status(500).json({
                        msg: cardInfo.name + ' card not created.'
                    });

                } else {

                    return res.status(200).json({
                        msg: cardInfo.name + ' card created.'
                    });

                }

            });


        }, (err) => {

            console.log(err);

            return res.status(500).json({
                msg: 'Error getting the Backlog Id'
            });

        });

    }

};

exports.showList = (req, res) => {

    var boardName = req.params.boardName;
    var listName = req.params.listName;

    trelloUtils.getBoardListId(boardName, listName).then((listId) => {

        var url = listUrlPrefix + '/' + listId + '/cards?' + authenticationTrelloSuffix;

        request.get({url: url}, (err, httpResponse, jsonResponse) => {

            trelloUtils.getNamesFromList(jsonResponse).then((cardsList) => {

                return res.status(200).json({
                    msg: cardsList
                });

            }, (err) => {

                return res.status(500).json({
                    msg: 'Error getting the names from the list'
                });

            });

        });

    }, (err) => {

        console.log(err);

        return res.status(500).json({
            msg: 'Error getting the Board Id'
        });

    });

};