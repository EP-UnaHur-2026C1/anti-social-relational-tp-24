'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    static associate(models) {
      Tags.belongsToMany(models.Publicaciones, {through: 'Publicacion_Tag', as: 'publicaciones'});
    }
  }
  Tags.init({
    etiqueta: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Tags',
    timestamps: false,
  });
  return Tags;
};