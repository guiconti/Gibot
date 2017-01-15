/*  global projectBoardId:true*/

var listUrlPrefix = 'https://api.trello.com/1/lists/';
var urlSuffix = '&key=' + trelloKey + '&token=' + trelloToken;

var ListEnum = {
    BACKLOG: 'Backlog',
    DOING: 2,
    DONE: 3,
};

exports.insertBacklog = (req, res) => {
    
    var body = _.pick(req.body, 'name', 'description');
    var toValidateFields = _.pick(req.body, 'description');

    if (!validation.isValidString(body.name)) {

        return res.status(400).json({
            msg: 'Name is not valid.'
        });

    } else {
    
        trelloUtils.getBoardListId(ListEnum.BACKLOG).then((backlogId) => {

            var cardInfo = {
                name: body.name
            };

            if (validation.isValidString(toValidateFields.description)) {

                cardInfo.description = toValidateFields.description;

            }

            var url = listUrlPrefix + '/' + backlogId + '/cards?' + urlSuffix;

            request.post({url: url, form: cardInfo}, (err, httpResponse, jsonResponse) => {

                if (!trelloUtils.validateCreation(jsonResponse)){

                    return res.status(500).json({
                        msg: cardInfo.name + ' card not created.'
                    })

                } else {

                    return res.status(200).json({
                        msg: cardInfo.name + ' card created.'
                    });

                }

            });


        }, (err) => {

            return res.status(500).json({
                msg: 'Error getting the Backlog Id'
            });

        });

    }

};

exports.listBacklog = (req, res) => {
    
    trelloUtils.getBoardListId(ListEnum.BACKLOG).then((backlogId) => {

        var url = listUrlPrefix + '/' + backlogId + '/cards?' + urlSuffix;

        request.get({url: url}, (err, httpResponse, jsonResponse) => {

            trelloUtils.getNamesFromList(jsonResponse).then((cardsList) => {

                return res.status(200).json({
                    msg: cardsList
                });

            }, (err) => {

                return res.status(500).json({
                    msg: 'Error getting the names from the list'
                });

            })

        });


    }, (err) => {

        return res.status(500).json({
            msg: 'Error getting the Backlog Id'
        });

    });

};