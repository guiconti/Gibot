exports.isValidString = (stringToValidated) => {

    return _.isString(stringToValidated) && stringToValidated.trim().length > 0;

};

exports.isListAction = (action) => {

    return action == 'liste' || action == 'list' || action == 'listar' || action == 'lista';

};

exports.isInsertAction = (action) => {

    return action == 'insert' || action == 'inserir' || action == 'insere' || action == 'insira';

};