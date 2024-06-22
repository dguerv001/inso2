const db = require("./cx");
const { Sequelize } = require("sequelize");
const Model = Sequelize.Model;
const conexion = db.sequelize;

class Poblacion extends Model {}
Poblacion.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cp: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: conexion,
    modelName: "poblaciones",
    timestamps: false,
    // options
  }
);

module.exports = Poblacion;
