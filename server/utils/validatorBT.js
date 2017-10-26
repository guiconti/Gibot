/**
 * Module to identify a requested action
 * @module utils/identifyAction
*/

//const _ = require('underscore');

/**
 * Identify the action select
 *
 * @param {string} action - Module that the action was requested
 * @param {string} action - Action requested by the user to be verified
 * @return {string} - Action name
*/
module.exports = (battletag) => {
  console.log("validatorBT: " + (/(\w){3,12}(#)(\d){4,5}$/).test(battletag));
  return (/(\w){3,12}(#)(\d){4,5}$/).test(battletag);
  
};