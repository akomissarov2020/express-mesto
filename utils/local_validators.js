const validator = require('validator');

module.exports.validateURLforScheme = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    return false;
  }
  return true;
};

module.exports.validateURL = (value, helper) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    return helper.message('Неправильный формат ссылки');
  }
  return true;
};
