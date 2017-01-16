var listBoardsUrlPrefix = 'https://api.trello.com/1/members/me/boards?';

exports.getBoardListId = (boardRequested, listRequested) => {

    return new Promise((resolve, reject) => {

        boardRequested = boardRequested.toLowerCase();
        listRequested = listRequested.toLowerCase();

        var boardId;
        var listId;

        //var projectsBoardUrl = projectBoardUrlPrefix + '?lists=open&list_fields=name&fields=name,desc=' + authenticationTrelloSuffix;

        var userProjectsUrl = listBoardsUrlPrefix + authenticationTrelloSuffix;

        request.get({url: userProjectsUrl}, (err, httpResponse, boardsJsonResponse) => {

            try {

                //  Parseia a resposta json contendo a lista de todas as boards que o usuario possui
                var boardsList = JSON.parse(boardsJsonResponse);
                
                //  Passa pela lista de boards e pega o Id da board requisitada
                boardsList.some((board) => {

                    if (board.name.toLowerCase() == boardRequested) {

                        //  Caso tenha encontrado a board pega a sua Id e retorna true para quebrar o loop
                        boardId = board.id;
                        return true;

                    }

                    return false;

                });

                //  URL da API do Trello para listar as listas de uma board especifica
                var boardListUrl = 'https://api.trello.com/1/boards/' + boardId + '/lists?' + authenticationTrelloSuffix;

                request.get({url: boardListUrl}, (err, httpResponse, listsJsonRespose) => {

                    //  Parseia a resposta json contendo a lista de todas as listas que o board possui
                    var listsList = JSON.parse(listsJsonRespose);

                    listsList.some((list) => {

                        //  Caso tenha encontrado a lista pega a sua Id e retorna true para quebrar o loop
                        if (list.name.toLowerCase() == listRequested) {

                            listId = list.id;
                            return true;

                        }

                        return false;

                    });

                    //  Devolve o id da lista
                    resolve(listId);

                });

                

            } catch (e) {

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
