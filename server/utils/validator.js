/**
 * All project validations
 * @module utils/validator
*/

const _ = require('underscore');

//  TODO: Split validation with better scope
function isValidString(stringToVerify) {
  return _.isString(stringToVerify) && stringToVerify.trim().length > 0;
}

function isValidRequest(userRequest) {
  return userRequest.action;
};

module.exports = {
  isValidString: isValidString,
  isValidRequest: isValidRequest
};
