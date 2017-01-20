//  ID do telegram que será o dono desse bot, utilizado para validar ações privadas
var ownerTelegramId = process.env.TELEGRAM_OWNER_ID;

//  Autentica o acesso a essa funcionalidade apenas para o dono da aplicacao
exports.authOwner = (userId) => {

    return new Promise((resolve, reject) => {

        return userId == ownerTelegramId?resolve():reject();
        
    }); 

};
