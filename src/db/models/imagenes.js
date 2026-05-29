'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Imagenes extends Model {
    static associate(models) {
      Imagenes.belongsTo(models.Publicaciones, {as: 'publicacion', foreignKey: 'publicacionId'});
    }
  }
  Imagenes.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Imagenes',
    timestamps: false,
  });
  return Imagenes;
};