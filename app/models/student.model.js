const Joi = require('joi');
const BaseModel = require('../utils/base-model.js');

module.exports = new BaseModel('Student', {
  name: Joi.string().required(),
  firstName: Joi.string().required(),
  major: Joi.string().required(),
  id: Joi.number().required(),
});
