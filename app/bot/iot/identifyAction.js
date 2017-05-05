/**
 * Módulo para identificar ações do IoT
 * @module bot/iot/identifyAction
 */

//  TODO: Melhorar isso
/**
 * Array para as possíveis variações de cada ação no IoT.
 * @readonly
 * @const {string[]}
 */
const photoActions = ['photo','foto','imagem','quarto','fotinho','fot','phot','poto','print'];

/**
 * Identifica qual a ação solicitada no IoT.
 *
 * @param {string} action - Ação a ser verificada
 * @return {string} - Nome da ação normalizado para ser utilizado na requisição
 */
exports.identifyAction = (action) => {

    return _.contains(photoActions, action)?IoTActions.PHOTO:undefined;

};
