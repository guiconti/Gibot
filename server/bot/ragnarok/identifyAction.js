/**
 * Módulo para identificar ações do Ragnarok
 * @module bot/ragnarok/identifyAction
 */

//  TODO: Melhorar isso
/**
 * Array para as possíveis variações de cada ação no Trello.
 * @readonly
 * @const {string[]}
 */
const listActions = ['liste','list','listar','lista','mvp list', 'mvp lista', 'lista mvp', 'mvps', 'list mvps', 'listar mvps', 'listar mvp'];
const insertActions = ['insert','inserir','insere','insira', 'insere mvp', 'inserir mvps', 'insere mvps', 'inserir mvp', 'insert mvp', 'insert mvps'];

/**
 * Identifica qual a ação solicitada no Ragnarok.
 *
 * @param {string} action - Ação a ser verificada
 * @return {string} - Nome da ação normalizado para ser utilizado na requisição
 */
exports.identifyAction = (action) => {

    return _.contains(listActions, action)?RagnarokActions.LIST:
        _.contains(insertActions, action)?RagnarokActions.INSERT:undefined;

};