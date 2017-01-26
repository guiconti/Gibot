/**
 * Módulo usado para validar cenários de verificação no bot
 * @module bot/validation
 */

/**
 * Valida se a requisição do usuário para uma função no Trello é válida.
 *
 * @param {string[]} userRequest - Todos os parâmetros da ação do Trello requisitado pelo usário.
 * @return {boolean} - True para uma ação do Trello válida e false caso contrário.
 */
exports.isValidAction = (userRequest) => {

    //  Por hora so considera request valido se tiver 3 argumentos ou mais
    return userRequest.length > 2

};

/**
 * Valida se o nome da card a ser inserida solicitada pelo usuário é válida
 *
 * @param {string} card - Nome da card a ser inserida.
 * @return {boolean} - True para um nome de card do Trello válida e false caso contrário.
 */
exports.isValidCard = (card) => {

    return _.isString(card) && card.trim().length > 0;

};

/**
 * Valida se a ação do Trello solicitada é uma ação de listagem
 *
 * @param {string} action - Ação solicitada pelo usuário.
 * @return {boolean} - True para uma ação de listagem e false caso contrário.
 */
exports.isListAction = (action) => {

    return action == 'liste' || action == 'list' || action == 'listar' || action == 'lista';

};

/**
 * Valida se a ação do Trello solicitada é uma ação de inserção
 *
 * @param {string} action - Ação solicitada pelo usuário.
 * @return {boolean} - True para uma ação de inserção e false caso contrário.
 */
exports.isInsertAction = (action) => {

    return action == 'insert' || action == 'inserir' || action == 'insere' || action == 'insira';

};
