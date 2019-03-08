/**
 * Module to get user's invoice
 * @module controllers/itau/getInvoice
*/

const bot = require('../../core/gibimbot');
const cache = require('../../utils/cache');
const request = require('request');
const moment = require('moment');
const getToken = require('./getToken');
const constants = require('../../utils/constants');

module.exports = async (msg, match) => {
  let chatId = msg.chat.id;
  let userData = cache.get(chatId + constants.cache.USER_DATA);

  if (!userData)
    return bot.sendMessage(chatId, constants.message.error.REGISTRATION_INCOMPLETE);
  
  //  TODO: Support multiple cards/accounts
  let userToken = await getToken(userData[0]).catch(err => {
    return bot.sendMessage(chatId, constants.message.error.REGISTER_ERROR);
  });
  let jar = request.jar();
  jar.setCookie(request.cookie(userToken), constants.url.itau.PREFIX);
  request.get({ url: constants.url.itau.PREFIX + constants.url.itau.INVOICE, jar: jar }, (err, httpResponse, body) => {
    if (err)
      return bot.sendMessage(chatId, 'Error');
    let invoiceData = JSON.parse(body);
    console.log(invoiceData.msg);
    bot.sendMessage(chatId, `Sua fatura está ${invoiceData.msg.data.proxima.status_fatura} e se encontra com o valor de R$${invoiceData.msg.data.proxima.cabecalho_fatura.total_fatura}. Ela fechará no dia ${invoiceData.msg.data.proxima.data_fechamento_fatura}`);
    let invoiceRecords = [];
    invoiceData.msg.data.proxima.lancamentos_nacionais.forEach(record => {
      if (record.data_lancamento == moment().format('MM-DD')) {
        invoiceRecords.push(`${record.descricao_lancamento} - R$${record.valor_lancamento}`);
      }
    });
    invoiceData.msg.data.proxima.lancamentos_internacionais.forEach(record => {
      if (record.data_lancamento == moment().format('MM-DD')) {
        invoiceRecords.push(`${record.descricao_lancamento} - R$${record.valor_lancamento}`);
      }
    });
    if (invoiceRecords.length === 0)
      return bot.sendMessage(chatId, constants.message.info.NO_RECORDS_TODAY);
    let message = 'Lançamentos de hoje\n';
    invoiceRecords.forEach(record => {
      message += '\n' + record;
    });
    return bot.sendMessage(chatId, message);
  });
};
