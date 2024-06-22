const exp = require("express");
const Bibliobuses = require("../modelos/Bibliobuses");
var app = exp.Router();
const Trabajadores = require("../modelos/Trabajadores");

app.get("/", (req, res) => {
  Bibliobuses.findAll({}).then((response) => {
    res.send(response);
  });
});

app.post("/", async (req, res) => {
  const { marca, matricula, numero } = req.body;
  console.log("Nuevo bibliobus " + marca + " matrícula " + matricula);
  Bibliobuses.findAll({
    where: {
      matricula: matricula,
    },
  }).then((response) => {
    if (response.length > 0) {
      res.send("Ya está el bibliobús en la base de datos");
    } else {
      var b = new Bibliobuses({
        numeroBiblioBus: numero,
        marca: marca,
        matricula: matricula,
      });
      b.save().then(() => {
        res.send("Nuevo bibliobus en la base de datos");
      });
    }
  });
});

app.get("/Trabajador", (req, res) => {
  const { dni } = req.query;

  Trabajadores.findAll({
    where: {
      dni: dni,
    },
  }).then((response) => {
    console.log(response);
    res.send(response);
  });
});

module.exports = app;
