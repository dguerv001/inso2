const db = require("./cx");
const { Sequelize } = require("sequelize");
const Roles = require("./Roles");
const Poblacion = require("./Poblaciones");
const Model = Sequelize.Model;
const conexion = db.sequelize;

class Persona extends Model {}
Persona.init(
  {
    dni: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    rol: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: Roles,
        key: "rol",
      },
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apellidos: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    direccion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    poblacion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telefono: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: conexion,
    modelName: "personas",
    timestamps: false,
    // options
  }
);

module.exports = Persona;
