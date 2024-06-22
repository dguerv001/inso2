const exp = require("express");
const Poblaciones = require("../modelos/Poblaciones");
var app = exp.Router();

app.get("/", (req, res) => {
  Poblaciones.findAll({}).then((response) => {
    res.send(response);
  });
});

app.get("/Nombre", (req, res) => {
  const { nombre } = req.query;
  console.log("Busca el pueblo con nombre " + nombre);
  Poblaciones.findAll({
    where: {
      nombre: nombre,
    },
  }).then((response) => {
    res.send(response);
  });
});

module.exports = app;
