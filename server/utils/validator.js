/**
 * All project validations
 * @module utils/validator
*/

const _ = require('underscore');

/**
 * Validate if the input is a valid array
 *
 * @param {array} arrayToValidate - Array to be validated
 * @return {boolean} - True case the array is valid and false if it is not
 */
function isValidArray(arrayToValidate) {
  return (
    arrayToValidate && 
    arrayToValidate instanceof Array && 
    arrayToValidate.length > 0
  );
};

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
  isValidArray: isValidArray,
  isValidString: isValidString,
  isValidNumber: isValidNumber,
  isValidRequest: isValidRequest,
  isValidCallbackQuery: isValidCallbackQuery
};
