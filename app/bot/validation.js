/**
 * Módulo de validações para o Telegram
 * @module bot/validation
 */

/**
 * Valida se uma requisição no Trello é válida.
 *
 * @param {string[]} userRequest - Array com todas as opções da requisição.
 * @return {boolean} - Retorna true se a ação for válida e false caso contrário.
 */
exports.isValidAction = (userRequest) => {

    //  Por hora so considera request valido se tiver 3 argumentos ou mais
    return userRequest.length > 2

};

/**
 * Valida se uma card do Trello é válida.
 *
 * @param {string} card - Nome da card para verificação.
 * @return {boolean} - Retorna true se a card for válida e false caso contrário.
 */
exports.isValidCard = (card) => {

    return _.isString(card) && card.trim().length > 0;

};

/**
 * Valida se uma ação de lista é válida.
 *
 * @param {string} action - Nome da ação solicitada.
 * @return {boolean} - Retorna true se a ação de listagem for válida e false caso contrário.
 */
exports.isListAction = (action) => {

return action == 'liste' || action == 'list' || action == 'listar' || action == 'lista';

};

/**
 * Valida se uma ação de insert é válida.
 *
 * @param {string} action - Nome da ação solicitada.
 * @return {boolean} - Retorna true se a ação de listagem for válida e false caso contrário.
 */
exports.isInsertAction = (action) => {

    return action == 'insert' || action == 'inserir' || action == 'insere' || action == 'insira';

};
