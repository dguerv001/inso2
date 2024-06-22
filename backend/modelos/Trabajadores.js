const db = require("./cx");
const { Sequelize } = require("sequelize");
const Model = Sequelize.Model;
const conexion = db.sequelize;
const Persona = require("./Personas");
const Bibliobus = require("./Bibliobuses");

class Trabajador extends Model {}
Trabajador.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    dni: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: Persona,
        key: "dni",
      },
    },
    numerobibliobus: {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: Bibliobus,
        key: "numeroBiblioBus",
      },
    },
  },
  {
    sequelize: conexion,
    modelName: "trabajadores",
    timestamps: false,

    // options
  }
);

module.exports = Trabajador;
