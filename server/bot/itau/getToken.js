/**
 * Module to get user's token
 * @module controllers/itau/getToken
*/
const cache = require('../../utils/cache');
const login = require('./login');
const constants = require('../../utils/constants');

module.exports = async userData => {
  return new Promise(async (resolve, reject) => {
    let userToken = cache.get(userData.card);

    if (userToken)
      return resolve(userToken);

    let loginData = await login(userData).catch(err => {
      return reject(err);
    });
    return resolve(loginData.token);
  });
};
