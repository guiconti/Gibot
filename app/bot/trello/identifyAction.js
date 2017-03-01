//  TODO: Melhorar isso
/**
 * Array para as possíveis variações de cada ação no Trello.
 * @readonly
 * @const {string[]}
 */
const listActions = ['liste','list','listar','lista'];
const insertActions = ['insert','inserir','insere','insira'];

/**
 * Identifica qual a ação solicitada no Trello.
 *
 * @param {string} action - Ação a ser verificada
 * @return {string} - Nome da ação normalizado para ser utilizado na requisição
 */
exports.identifyAction = (action) => {

    return _.contains(listActions, action)?TrelloActions.LIST:
        _.contains(insertActions, action)?TrelloActions.INSERT:undefined;

}