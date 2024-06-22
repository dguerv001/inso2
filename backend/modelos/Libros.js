const db = require("./cx");
const conexion = db.sequelize;
const Soporte = require("./Soportes");
const Bibliobus = require("./Bibliobuses");
const { Sequelize } = require("sequelize");
const Model = Sequelize.Model;

class Libro extends Model {}
Libro.init(
  {
    // attributes
    marca: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    ISBN: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    titulo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    autor: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    soporte: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: Soporte,
        key: "tipo",
      },
    },
    editorial: {
      type: Sequelize.STRING,
      allowNull: false,
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
    modelName: "libros",
    timestamps: false,

    // options
  }
);

module.exports = Libro;
