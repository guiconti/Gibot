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
exports.isValidTrelloAction = (userRequest) => {

    //  Por hora so considera request valido se tiver uma ação, o nome da board e o nome da lista
    return userRequest.action && userRequest.boardName && userRequest.listName;

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
 * Valida se a requisição do usuário para uma função no Gmail é válida.
 *
 * @param {string[]} userRequest - Todos os parâmetros da ação do Gmail requisitado pelo usário.
 * @return {boolean} - True para uma ação do Gmail válida e false caso contrário.
 */
exports.isValidGmailAction = (userRequest) => {

    //  Por hora so considera request valido se tiver 1 argumento ou mais
    return userRequest.action;

};

/**
 * Valida se o nome da card a ser inserida solicitada pelo usuário é válida
 *
 * @param {integer} number - Número a ser validado.
 * @return {boolean} - True para um número válido e false caso contrário.
 */
exports.isValidNumber = (number) => {

    return _.isNumber(number);

};

/**
 * Valida se o nome da card a ser inserida solicitada pelo usuário é válida
 *
 * @param {date} date - Data a ser validada no forma DD-MM-YYYY
 * @return {boolean} - True para uma data válida e false caso contrário.
 */
exports.isValidDate = (date) => {

    try {

        return moment(date.trim() || date, 'DD-MM-YYYY', true).isValid();

    } catch (e) {

        return false;

    }

};

/**
 * Valida se a requisição do usuário para uma função no Ragnarok é válida.
 *
 * @param {string[]} userRequest - Todos os parâmetros da ação do Ragnarok requisitado pelo usário.
 * @return {boolean} - True para uma ação do Ragnarok válida e false caso contrário.
 */
exports.isValidRagnarokAction = (userRequest) => {

    //  Por hora so considera request valido se tiver 1 argumento ou mais
    return userRequest.action;

};
