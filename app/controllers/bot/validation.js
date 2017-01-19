exports.isValidAction = (userRequest) => {

    //  Por hora so considera request valido se tiver 3 argumentos ou mais
    return userRequest.length > 2

};

exports.isValidCard = (card) => {

    return _.isString(card) && card.trim().length > 0;

};

exports.isListAction = (action) => {

return action == 'liste' || action == 'list' || action == 'listar' || action == 'lista';

};

exports.isInsertAction = (action) => {

    return action == 'insert' || action == 'inserir' || action == 'insere' || action == 'insira';

};