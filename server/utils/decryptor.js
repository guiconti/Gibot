/**
 * Module to decrypt data
 * @module utils/decryptor
 */
const crypto = require('crypto-js');
const validator = require('../utils/validator');

/**
 * Decrypt an encrypted data
 *
 * @param {string} encryptedData - Data to be decrypted
 * @param {string} key - Key to decrypt the data
 * @return {object} - Returns all the data inside the encrypted data
 * @throws {object} - Returns -1 that indicates a fail
 *
 */
module.exports = (encryptedData, key) => {
  if (!encryptedData || !key) return false;

  try {
    let decryptedDataInBytes = crypto.AES.decrypt(encryptedData, key);
    let decryptedData = decryptedDataInBytes.toString(crypto.enc.Utf8);

    if (validator.isValidJSON(decryptedData))
      decryptedData = JSON.parse(decryptedData);

    return decryptedData;
  } catch (err) {
    return false;
  }
};
