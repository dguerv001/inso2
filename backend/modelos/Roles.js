const db = require("./cx");
const { Sequelize } = require("sequelize");
const Model = Sequelize.Model;
const conexion = db.sequelize;

class Rol extends Model {}
Rol.init(
  {
    // attributes
    rol: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    descripcion: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: conexion,
    modelName: "roles",
    timestamps: false,

    // options
  }
);

module.exports = Rol;
