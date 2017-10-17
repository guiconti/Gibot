/**
 * All project validations
 * @module utils/validator
*/

const _ = require('underscore');

//  TODO: Split validation with better scope
function isValidString(stringToVerify) {
  return _.isString(stringToVerify) && stringToVerify.trim().length > 0;
}

function isValidNumber(numberToVerify) {
  return _.isNumber(numberToVerify) && numberToVerify != undefined;
}

function isValidRequest(userRequest) {
  return userRequest.action;
};

function isValidCallbackQuery(callbackQuery) {
  return _.isString(callbackQuery.t) && callbackQuery.t.trim().length > 0;
}

module.exports = {
  isValidString: isValidString,
  isValidNumber: isValidNumber,
  isValidRequest: isValidRequest,
  isValidCallbackQuery: isValidCallbackQuery
};
