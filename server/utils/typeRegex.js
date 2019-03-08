/**
 * Module to return type regex
 * @module utils/typeRegex
 */

const constants = require ('./constants');

let typeRegex = '(';
for (let i = 0; i < Object.keys(constants.itau.types).length; i++) {
  typeRegex += Object.keys(constants.itau.types)[i];
  if (i < Object.keys(constants.itau.types).length - 1)
    typeRegex += '|';
  else
  typeRegex += ')';
}

module.exports = new RegExp(typeRegex);
