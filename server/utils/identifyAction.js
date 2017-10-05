/**
 * Module to identify a requested action
 * @module utils/identifyAction
*/

const actionValidators = require('./actionValidators');
const validator = require('./validator');
const _ = require('underscore');

/**
 * Identify the action select
 *
 * @param {string} action - Module that the action was requested
 * @param {string} action - Action requested by the user to be verified
 * @return {string} - Action name
*/
module.exports = (functionality, action) => {
  if (!validator.isValidString(functionality) || !validator.isValidString(action)){
    return false;
  }

  functionality = functionality.trim().toUpperCase();
  action = action.trim().toLowerCase();
  if (!actionValidators[functionality]){
    return false;
  }
  for (let key in actionValidators[functionality]){
    if (_.contains(actionValidators[functionality][key], action)){
      return key.toLowerCase();
    }
  }
  return false;
};