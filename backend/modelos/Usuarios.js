const db = require("./cx");
const { Sequelize } = require("sequelize");
const Model = Sequelize.Model;
const conexion = db.sequelize;
const Personas = require("./Personas");

class Usuario extends Model {}
Usuario.init(
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
        model: Personas,
        key: "dni",
      },
    },
    ban: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    fechaFinBan: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: conexion,
    modelName: "usuarios",
    timestamps: false,

    // options
  }
);

module.exports = Usuario;
