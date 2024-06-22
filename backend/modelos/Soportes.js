const db = require("./cx");
const { Sequelize } = require("sequelize");
const Model = Sequelize.Model;
const conexion = db.sequelize;

class Soporte extends Model {}
Soporte.init(
  {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: conexion,
    modelName: "soportes",
    timestamps: false,

    // options
  }
);

module.exports = Soporte;
