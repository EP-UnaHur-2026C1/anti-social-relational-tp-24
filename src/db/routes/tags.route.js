const { Router } = require('express');
const { createTag, getAllTags, deleteTag } = require('../controllers/tag.controller');
const { validarTagById } = require('../middlewares/usuario.middleware')
const route = Router();

route.get('/', getAllTags); // localhost:3001/Tags
route.post('/', createTag);
route.delete('/:tagId', validarTagById, deleteTag); // localhost:3001/Tags/:TagId

module.exports = route;