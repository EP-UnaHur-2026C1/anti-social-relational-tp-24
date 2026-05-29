const { Router } = require('express');
const { 
    findAll, 
    findByPK, 
    findPublicacionesById, 
    findComentariosById, 
    createUsuario,
    createPublicacion,
    getImagenesByPublicacion,
    addImagenToPublicacion,
    addTagToPublicacion,
    getTagsByPublicacion,
    getPublicacionById,
    deleteUsuario,
    deletePublicacion,
    deleteImagen,
    deleteComentario,
    deleteTagFromPublicacion,
    addComentarioToPublicacion

} = require('../controllers/usuario.controller');
const route = Router();

const { 
    validarUsuarioById,
    validarPublicacionById,
    validarImagenById,
    validarComentarioById,
    validarTagById,
    validarSchemaUsuario, 
    validarSchemaPublicacion,
    validarSchemaImagen,
    validarSchemaComentario,
    validarSchemaTag
    } = require('../middlewares/usuario.middleware')

route.get('/', findAll); // localhost:3001/Usuarios
route.get('/:usuarioId', validarUsuarioById, findByPK);
route.get('/:usuarioId/publicaciones', validarUsuarioById, findPublicacionesById);
route.get('/:usuarioId/publicaciones/:publicacionId', validarUsuarioById, validarPublicacionById, getPublicacionById);
route.get('/:usuarioId/publicaciones/:publicacionId/imagenes', validarUsuarioById, validarPublicacionById, getImagenesByPublicacion);
route.get('/:usuarioId/publicaciones/:publicacionId/tags', validarUsuarioById, validarPublicacionById, getTagsByPublicacion);
route.get('/:usuarioId/publicaciones/:publicacionId/comentarios',validarUsuarioById, validarPublicacionById, findComentariosById);

route.post('/', validarSchemaUsuario, createUsuario);
route.post('/:usuarioId/publicaciones', validarSchemaPublicacion, createPublicacion);
route.post('/:usuarioId/publicaciones/:publicacionId/imagenes', validarSchemaImagen, addImagenToPublicacion);
route.post('/:usuarioId/publicaciones/:publicacionId/tags', validarSchemaTag, addTagToPublicacion);
route.post('/:usuarioId/publicaciones/:publicacionId/comentarios', validarSchemaComentario, addComentarioToPublicacion);

route.delete('/:usuarioId', validarUsuarioById, deleteUsuario);
route.delete('/:usuarioId/publicaciones/:publicacionId', validarUsuarioById, validarPublicacionById, deletePublicacion);
route.delete('/:usuarioId/publicaciones/:publicacionId/imagenes/:imagenId', validarUsuarioById, validarPublicacionById, validarImagenById, deleteImagen);
route.delete('/:usuarioId/publicaciones/:publicacionId/comentarios/:comentarioId', validarUsuarioById, validarPublicacionById, validarComentarioById, deleteComentario);
route.delete('/:usuarioId/publicaciones/:publicacionId/tags/:tagId', validarUsuarioById, validarPublicacionById, validarTagById, deleteTagFromPublicacion); //Solo borra la etiqueta de la publicación, no la etiqueta en sí

module.exports = route;