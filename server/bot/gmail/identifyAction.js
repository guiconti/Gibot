/**
 * Módulo para identificar ações do Gmail
 * @module bot/gmail/identifyAction
 */

//  TODO: Melhorar isso
/**
 * Array para as possíveis variações de cada ação no Gmail.
 * @readonly
 * @const {string[]}
 */
const listActions = ['liste','list','listar','lista'];

/**
 * Identifica qual a ação solicitada no Gmail.
 *
 * @param {string} action - Ação a ser verificada
 * @return {string} - Nome da ação normalizado para ser utilizado na requisição
 */
exports.identifyAction = (action) => {

    return _.contains(listActions, action)?GmailActions.LIST:undefined;

};
