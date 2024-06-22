const db = require("./cx");
const conexion = db.sequelize;
const Soportes = require("./Soportes");
const { Sequelize } = require("sequelize");
const Model = Sequelize.Model;
const Bibliobus = require("./Bibliobuses");

class ImagenSonido extends Model {}
ImagenSonido.init(
  {
    // attributes
    marca: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    titulo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    soporte: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: Soportes,
        key: "tipo",
      },
    },
    duracion: {
      type: Sequelize.INTEGER,
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
    modelName: "imagenSonidos",
    timestamps: false,

    // options
  }
);

module.exports = ImagenSonido;
