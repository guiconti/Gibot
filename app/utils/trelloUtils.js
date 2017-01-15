var projectBoardUrlPrefix = 'https://api.trello.com/1/boards/' + process.env.TRELLO_PROJETO_BOARD_ID;
var projectBoardUrlSuffix = '&key=' + trelloKey + '&token=' + trelloToken;

exports.getBoardListId = (boardRequested) => {

    return new Promise((resolve, reject) => {

        var projectsBoardUrl = projectBoardUrlPrefix + '?lists=open&list_fields=name&fields=name,desc=' + projectBoardUrlSuffix;

        request.get({url: projectsBoardUrl}, (err, httpResponse, jsonResponse) => {

            try {

                var boards = JSON.parse(jsonResponse);

                var boardsList = _.findWhere(boards.lists, {name: boardRequested});

                resolve(boardsList.id);


            } catch (e) {

                console.log(e);

                reject(e);

            }

        });

    });

};

exports.validateCreation = (jsonResponse) => {

    var cardCreated = JSON.parse(jsonResponse);

    // TODO: Check what went wrong
    if (!cardCreated.id) {

        return false;

    } else {

        return true;
    
    }

};

exports.getNamesFromList = (jsonList) => {

    return new Promise((resolve, reject) => {

        try {

            var listToFilter = JSON.parse(jsonList);
            var namesList = [];

            listToFilter.forEach((item) => {

                if (_.isString(item.name)) {

                    namesList.push(item.name);

                }

            });

            resolve (namesList);

        } catch (e) {

            reject(e);

        }

    });


};
