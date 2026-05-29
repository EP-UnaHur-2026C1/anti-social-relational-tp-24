'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.hasMany(models.Publicaciones, {as: 'publicaciones', foreignKey: 'usuarioId', onDelete: 'CASCADE'});
      Usuario.hasMany(models.Comentario, {as: 'comentarios', foreignKey: 'usuarioId'})
    }
  }
  Usuario.init({
    nickname: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    timestamps: false,
  });
  return Usuario;
};