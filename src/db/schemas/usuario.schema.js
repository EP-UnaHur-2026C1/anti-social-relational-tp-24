const Joi = require("joi");
const db = require('../models');

const usuarioSchema = Joi.object({
  nickname: Joi.string().min(3).max(20).required().messages({
    "string.empty": "El nickname no puede ser vacio",
    "string.min": "El nickname tiene que tener al menos 3 caracteres",
    "string.max": "El nickname tiene que tener como maximo 20 caracteres",
    "any.required": "El atributo nickname debe existir",
  }),
});

module.exports = usuarioSchema;
