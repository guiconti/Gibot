/**
 * Module to login user
 * @module controllers/itau/login
*/
const cache = require('../../utils/cache');
const request = require('request');
const constants = require('../../utils/constants');

module.exports = async userData => {
  return new Promise((resolve, reject) => {
    let body = {
      type: userData.type,
      card: userData.card,
      password: userData.password
    };
    request.post({ url: process.env.ITAU_PREFIX + constants.itau.LOGIN, json: body }, (err, httpResponse, body) => {
      if (err)
        return reject(constants.message.error.REGISTER_ERROR);
      let data = {
        msg: constants.message.info.REGISTRATION_COMPLETE,
        token: httpResponse.headers['set-cookie'][0]
      };
      return resolve(data);
    });
  });
};
