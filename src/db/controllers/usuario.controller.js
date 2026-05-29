const db = require('../models');

const findAll = async (_ , res) => {
  const data = await db.Usuario.findAll({}); // localhost.3001/Usuarios
  res.status(200).json(data);
}

const findByPK = async (req, res) => {
  const id = req.params.usuarioId;
  const data = await db.Usuario.findByPk(id);
  res.status(200).json(data);
}

const findPublicacionesById = async (req, res) => {
  const id = req.params.usuarioId;
  const data = await db.Usuario.findOne({
    where: { id },
    include: [
      {
        model: db.Publicaciones,
        as: 'publicaciones',
      }
    ]
  });
  res.status(200).json(data);
};

const findComentariosById = async (req, res) => {
  const { usuarioId, publicacionId } = req.params;
  const data = await db.Publicaciones.findOne({
    where: { id: publicacionId, usuarioId: usuarioId },
    include: [
      {
        model: db.Comentario,
        as: 'comentarios',
      }
    ]
  });
  // Para mostrar si esVisible
  const comentariosProcesados = data.comentarios.map(c => {
    const dias = (Date.now() - c.createdAt) / (1000 * 60 * 60 * 24); //Valor en milisegundos, calculado en días
    return {
      ...c.toJSON(), //convierte el comentario a json
      esVisible: dias <= 30 // true si tiene menos de 30 días
    };
  });
  res.status(200).json({
    ...data.toJSON(),
    comentarios: comentariosProcesados
  });
};

const addComentarioToPublicacion = async (req, res) => {
  const { usuarioId, publicacionId } = req.params;
  const { contenido, autorNombre } = req.body;
  const publicacion = await db.Publicaciones.findOne({
    where: { id: Number(publicacionId), usuarioId: Number(usuarioId) }
  });
  const nuevoComentario = await db.Comentario.create({ autorNombre, contenido, publicacionId: Number(publicacionId) });
  res.status(201).json(nuevoComentario);
};

const createUsuario = async(req, res) =>{
  const data = req.body;
  const record = await db.Usuario.create(data);
  res.status(201).json(record);
}

const createPublicacion = async (req, res) =>{ 
  const { descripcion } = req.body;
  const usuarioId = req.params.usuarioId;
  const record = await db.Publicaciones.create({ descripcion, usuarioId });
  res.status(201).json(record);
}

const getImagenesByPublicacion = async (req, res) => {
  const { usuarioId, publicacionId } = req.params;
  const data = await db.Publicaciones.findOne({
    where: { id: publicacionId, usuarioId: usuarioId },
    include: [
      {
        model: db.Imagenes,
        as: 'imagenes'
      }
    ]
  });
  res.status(200).json(data);
};

const addImagenToPublicacion = async (req, res) => {
  const { usuarioId, publicacionId } = req.params;
  const { url } = req.body;
  const publicacion = await db.Publicaciones.findOne({
    where: { id: Number(publicacionId), usuarioId: Number(usuarioId) }
  });
  const imagen = await db.Imagenes.create({url,publicacionId: Number(publicacionId)});
  res.status(201).json(imagen);
};

const addTagToPublicacion = async (req, res) => {
  const { usuarioId, publicacionId } = req.params;
  const { etiqueta } = req.body;
  const usuario = await db.Usuario.findByPk(usuarioId);
  const publicacion = await db.Publicaciones.findOne({
    where: { id: publicacionId, usuarioId }
  });
  const [tag, created] = await db.Tags.findOrCreate({
    where: { etiqueta },
    defaults: { etiqueta }
  });
  await publicacion.addEtiqueta(tag);
  res.status(201).json({ message: "Etiqueta asignada correctamente", tag });
};

const getTagsByPublicacion = async (req, res) => {
  const { usuarioId, publicacionId } = req.params;
  const publicacion = await db.Publicaciones.findOne({
    where: { id: Number(publicacionId), usuarioId: Number(usuarioId) },
    include: [
      {
        model: db.Tags,
        as: 'etiquetas'
      }
    ]
  });
  res.status(200).json(publicacion.etiquetas);
};

const getPublicacionById = async (req, res) => {
  const { usuarioId, publicacionId } = req.params;
  const publicacion = await db.Publicaciones.findOne({
    where: { id: publicacionId, usuarioId: usuarioId }
  });
  res.status(200).json(publicacion);
};

const deleteUsuario = async (req, res) => {
  await db.Usuario.destroy({ where: { id: req.params.usuarioId } });
  res.status(200).json({ message: "Usuario eliminado" });
};

const deletePublicacion = async (req, res) => {
  await db.Publicaciones.destroy({ where: { id: req.params.publicacionId } });
  res.status(200).json({ message: "Publicación eliminada" });
};

const deleteImagen = async (req, res) => {
  await db.Imagenes.destroy({ where: { id: req.params.imagenId } });
  res.status(200).json({ message: "Imagen eliminada" });
};

const deleteComentario = async (req, res) => {
    await db.Comentario.destroy({ where: { id: req.params.comentarioId } });
  res.status(200).json({ message: "Comentario eliminado" });
};

const deleteTagFromPublicacion = async (req, res) => {
  const publicacion = await db.Publicaciones.findByPk(req.params.publicacionId);
  const tag = await db.Tags.findByPk(req.params.tagId);
  await publicacion.removeEtiqueta(tag);
  res.status(200).json({ message: "Tag eliminado de la publicación" });
};

module.exports = {
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
};