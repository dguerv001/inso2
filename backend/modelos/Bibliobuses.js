const db = require("./cx");
const conexion = db.sequelize;
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Bibliobus extends Model {}
Bibliobus.init(
  {
    numeroBiblioBus: {
      type: Sequelize.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    matricula: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    marca: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: conexion,
    modelName: "bibliobuses",
    timestamps: false,
    // options
  }
);

module.exports = Bibliobus;
