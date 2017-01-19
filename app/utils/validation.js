exports.isValidString = (stringToValidated) => {

    return _.isString(stringToValidated) && stringToValidated.trim().length > 0;

};
