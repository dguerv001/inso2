const db = require("./cx");
const conexion = db.sequelize;
const Soporte = require("./Soportes");
const { Sequelize } = require("sequelize");
const Model = Sequelize.Model;
const Bibliobus = require("./Bibliobuses");

class Revista extends Model {}
Revista.init(
  {
    // attributes
    marca: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    genero: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    numero: {
      type: Sequelize.STRING,
    },
    soporte: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: Soporte,
        key: "tipo",
      },
    },
    numerobibliobus: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: Bibliobus,
        key: "numeroBibliobus",
      },
    },
  },
  {
    sequelize: conexion,
    modelName: "revistas",
    timestamps: false,

    // options
  }
);

module.exports = Revista;
