/**
 * Module to get user's invoice
 * @module controllers/itau/getInvoice
*/

const bot = require('../../core/gibimbot');
const cache = require('../../utils/cache');
const database = require('../../models/database');
const decryptor = require('../../utils/decryptor');
const request = require('request');
const moment = require('moment');
const getToken = require('./getToken');
const constants = require('../../utils/constants');

module.exports = async (msg, match) => {
  let chatId = msg.chat.id;
  let userData = cache.get(chatId + constants.cache.USER_DATA);
  try {
    userData = await database.User.find({ chatId }).lean();
    userData[0].card = decryptor(userData[0].card, constants.itau.CARD_ENCRYPTATION_KEY).toString();
    userData[0].password = decryptor(userData[0].password, constants.itau.PASSWORD_ENCRYPTATION_KEY).toString();
    cache.set(chatId + constants.cache.USER_DATA, userData);
  } catch (err) {
    return bot.sendMessage(chatId, constants.message.error.REGISTRATION_INCOMPLETE);
  }

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
    bot.sendMessage(chatId, `Sua fatura está ${invoiceData.msg.data.proxima.status_fatura} e se encontra com o valor de R$${invoiceData.msg.data.proxima.cabecalho_fatura.total_fatura}. Ela fechará no dia ${invoiceData.msg.data.proxima.data_fechamento_fatura}`);
    let totalInvoice = 0;
    let invoiceRecords = [];
    invoiceData.msg.data.proxima.lancamentos_nacionais.forEach(record => {
      record.lancamentos.forEach(lancamento => {
        totalInvoice += lancamento.valor_lancamento;
        if (lancamento.data_lancamento == moment().format('MM-DD')) {
          invoiceRecords.push(`${lancamento.descricao_lancamento} - R$${lancamento.valor_lancamento}`);
        }
      });
    });
    invoiceData.msg.data.proxima.lancamentos_internacionais.forEach(record => {
      record.lancamentos.forEach(lancamento => {
        totalInvoice += lancamento.valor_pagar;
        if (lancamento.data_lancamento == moment().format('MM-DD')) {
          invoiceRecords.push(`${lancamento.descricao_lancamento} - R$${lancamento.valor_pagar}`);
        }
      });
    });
    let message = `Valor total atual: R$${totalInvoice}\n\n`;
    if (invoiceRecords.length === 0)
      return bot.sendMessage(chatId, message + constants.message.info.NO_RECORDS_TODAY);
    message += 'Lançamentos de hoje\n';
    invoiceRecords.forEach(record => {
      message += '\n' + record;
    });
    return bot.sendMessage(chatId, message);
  });
};
