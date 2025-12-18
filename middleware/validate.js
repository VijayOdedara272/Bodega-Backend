const Joi = require('joi');
const { error } = require('../utils/response');

function validate(schema) {
  return (req, res, next) => {
    const toValidate = {};
    // validate based on presence
    if (Object.keys(req.body || {}).length) toValidate.body = req.body;
    if (Object.keys(req.params || {}).length) toValidate.params = req.params;
    if (Object.keys(req.query || {}).length) toValidate.query = req.query;

    const result = schema.validate(toValidate, { abortEarly: false, allowUnknown: true });
    if (result.error) {
      const msg = result.error.details.map(d => d.message).join(', ');
      return error(res, msg, 400);
    }
    next();
  };
}

module.exports = validate;
