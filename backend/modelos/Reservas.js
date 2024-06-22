const db = require("./cx");
const conexion = db.sequelize;
const Poblacion = require("./Poblaciones");
const { Sequelize } = require("sequelize");
const Usuario = require("./Usuarios");
const Libros = require("./Libros");
const Revistas = require("./Revistas");
const ImagenSonido = require("./ImagenSonido");
const Model = Sequelize.Model;

class Reserva extends Model {}
Reserva.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fechaPrestamo: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    fechaDevolucion: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    idPoblacion: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Poblacion,
        key: "id",
      },
    },
    idUsuario: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: "id",
      },
    },
    idFondo: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: conexion,
    modelName: "reservas",
    timestamps: false,
    // options
  }
);

module.exports = Reserva;
