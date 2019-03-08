/**
 * Module to retrieve controllers
 * @module utils/retrieveControllers
 */

const fs = require('fs');
const path = require('path');

module.exports = (dirname, filename) => {
  let controllers = [];

  fs.readdirSync(dirname).forEach(file => {
    if (file.indexOf('.') !== -1 && file !== path.basename(filename))
      controllers[file.split('.')[0]] = require(dirname + '/' + file);
  });

  return controllers;
};
