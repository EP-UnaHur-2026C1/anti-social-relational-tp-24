'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comentarios extends Model {
    static associate(models) {
      Comentarios.belongsTo(models.Publicaciones, {as: 'publicacion', foreignKey: 'publicacionId'});
      Comentarios.belongsTo(models.Usuario, {as: 'usuario', foreignKey: 'usuarioId'} );
    }
  }
  Comentarios.init({
    autorNombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
    contenido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    esVisible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Comentario',
  });
  return Comentarios;
};