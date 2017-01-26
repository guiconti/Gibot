exports.isValidString = (stringToValidated) => {

    return _.isString(stringToValidated) && stringToValidated.trim().length > 0;

};

exports.isValidNumber = (number) => {

    return _.isNumber(number);

};

exports.isValidDate = (date) => {

    return moment(date, 'DD-MM-YYYY').isValid();

};
