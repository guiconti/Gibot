/**
 * Módulo de autenticação de usuários para utilização de APIs
 * @module bot/middleware
 */

/**  ID do telegram que será o dono desse bot, utilizado para validar ações privadas */
const ownerTelegramId = process.env.TELEGRAM_OWNER_ID;

/**
 * Autentica o usuário como Owner do bot. Utilizado para validar acesso a APIs restritas.
 * chamando primeiramente essa função no roteador.
 *
 * @param {string} userId - Id do usuário que a ser validado.
 * @return {Promise.Boolean} - Uma promise que retorna uma Boolean em caso de sucesso
 * @throws {Error} - Rejeita a promise com o erro ocorrido
 */
exports.authOwner = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      /**  Verifica se o userId dado é igual ao Id do dono do Telegram */
      return resolve(userId == ownerTelegramId);

    } catch(e) {
      reject(e);
    }  
  }); 
};
