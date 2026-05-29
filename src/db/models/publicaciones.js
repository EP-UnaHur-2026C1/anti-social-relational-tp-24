'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publicaciones extends Model {
    static associate(models) {
      Publicaciones.belongsTo(models.Usuario, {as: 'usuario', foreignKey: 'usuarioId'});
      Publicaciones.hasMany(models.Imagenes, {as: 'imagenes', foreignKey: 'publicacionId', onDelete: 'CASCADE'});
      Publicaciones.hasMany(models.Comentario, {as: 'comentarios', foreignKey: 'publicacionId', onDelete: 'CASCADE'});
      Publicaciones.belongsToMany(models.Tags, {through: 'Publicacion_Tag', as: 'etiquetas', onDelete: 'CASCADE'});
    }
  }
  Publicaciones.init({
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Publicaciones',
  });
  return Publicaciones;
};