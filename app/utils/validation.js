/**
 * Valida se o nome da card a ser inserida solicitada pelo usuário é válida
 *
 * @param {string} stringToValidated - String a ser validada.
 * @return {boolean} - True para uma string válida e false caso contrário.
 */
exports.isValidString = (stringToValidated) => {

    return _.isString(stringToValidated) && stringToValidated.trim().length > 0;

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

    return moment(date, 'DD-MM-YYYY').isValid();

};
