const exp = require("express");
const Libros = require("../modelos/Libros");
const Revistas = require("../modelos/Revistas");
const ImagenSonido = require("../modelos/ImagenSonido");
const Reservas = require("../modelos/Reservas");
const { where } = require("sequelize");
const Soporte = require("../modelos/Soportes");
var app = exp.Router();

app.get("/Soportes", (req, res) => {
  Soporte.findAll({}).then((response) => {
    res.send(response);
  });
});

app.get("/Libros", (req, res) => {
  Libros.findAll({}).then((response) => {
    res.send(response);
  });
});

app.get("/Revistas", (req, res) => {
  Revistas.findAll({}).then((response) => {
    res.send(response);
  });
});

app.get("/ImagenSonido", (req, res) => {
  ImagenSonido.findAll({}).then((response) => {
    res.send(response);
  });
});

app.get("/Libros/Reserva", async (req, res) => {
  await Libros.findAll({}).then((response) => {
    Reservas.findAll({}).then((responseReservas) => {
      for (var i = 0; i < responseReservas.length; i++) {
        if (responseReservas[i].idLibro != "") {
          for (var j = 0; j < response.length; j++) {
            if (response[j].marca == responseReservas[i].idFondo) {
              response.splice(j, 1);
            }
          }
        }
      }
      res.send(response);
    });
  });
});

app.get("/Revistas/Reserva", async (req, res) => {
  await Revistas.findAll({}).then((response) => {
    Reservas.findAll({}).then((responseReservas) => {
      for (var i = 0; i < responseReservas.length; i++) {
        if (responseReservas[i].idLibro != "") {
          for (var j = 0; j < response.length; j++) {
            if (response[j].marca == responseReservas[i].idFondo) {
              response.splice(j, 1);
            }
          }
        }
      }
      res.send(response);
    });
  });
});

app.get("/ImagenSonido/Reserva", async (req, res) => {
  await ImagenSonido.findAll({}).then((response) => {
    Reservas.findAll({}).then((responseReservas) => {
      for (var i = 0; i < responseReservas.length; i++) {
        if (responseReservas[i].idLibro != "") {
          for (var j = 0; j < response.length; j++) {
            if (response[j].marca == responseReservas[i].idFondo) {
              response.splice(j, 1);
            }
          }
        }
      }
      res.send(response);
    });
  });
});

app.put("/Libros", (req, res) => {
  const { marca, ISBN, titulo, autor, editorial, soporte, numeroBiblioBus } =
    req.query;
  Libros.findAll({
    where: {
      marca: marca,
    },
  }).then((response) => {
    if (response.length > 0) {
      response[0].marca = marca;
      response[0].ISBN = ISBN;
      response[0].titulo = titulo;
      response[0].autor = autor;
      response[0].editorial = editorial;
      response[0].soporte = soporte;
      response[0].numneroBilbioBus = numeroBiblioBus;
      response[0]
        .save()
        .then((a) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log("Error: " + err);
        });
    }
  });
});

app.put("/Revistas", (req, res) => {
  const { marca, nombre, genero, numero, soporte } = req.query;
  Revistas.findAll({
    where: {
      marca: marca,
    },
  }).then((response) => {
    if (response.length > 0) {
      response[0].marca = marca;
      response[0].nombre = nombre;
      response[0].genero = genero;
      response[0].numero = numero;
      response[0].soporte = soporte;
      response[0]
        .save()
        .then((a) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log("Error: " + err);
        });
    }
  });
});

app.put("/ImagenSonido", (req, res) => {
  const { marca, titulo, soporte, duracion } = req.query;
  ImagenSonido.findAll({
    where: {
      marca: marca,
    },
  }).then((response) => {
    if (response.length > 0) {
      response[0].marca = marca;
      response[0].nombre = titulo;
      response[0].duracion = duracion;
      response[0].soporte = soporte;
      response[0]
        .save()
        .then((a) => {
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log("Error: " + err);
        });
    }
  });
});

app.post("/Libros", (req, res) => {
  const { marca, ISBN, titulo, autor, editorial, soporte, numerobibliobus } =
    req.body;
  console.log(numerobibliobus);
  Libros.findAll({
    where: {
      marca: marca,
    },
  }).then((response) => {
    if (response.length > 0) {
      res.send("Ya esta en la base de datos");
    } else {
      const lib = new Libros({
        marca: marca,
        ISBN: ISBN,
        titulo: titulo,
        autor: autor,
        editorial: editorial,
        soporte: soporte,
        numerobibliobus: numerobibliobus,
      });
      lib
        .save()
        .then(() => {
          res.send("Libro añadido a la base de datos con exito");
        })
        .catch((err) => {
          console.log("Error: " + err);
          res.sendStatus(500);
        });
    }
  });
});

app.post("/Revistas", (req, res) => {
  const { marca, nombre, genero, numero, soporte, numerobibliobus } = req.body;
  Revistas.findAll({
    where: {
      marca: marca,
    },
  }).then((response) => {
    if (response.length > 0) {
      res.send("Ya esta en la base de datos");
    } else {
      const rev = new Revistas({
        marca: marca,
        nombre: nombre,
        genero: genero,
        numero: numero,
        soporte: soporte,
        numerobibliobus: numerobibliobus,
      });
      rev
        .save()
        .then(() => {
          res.send("Revista añadida a la base de datos con exito");
        })
        .catch((err) => {
          console.log("Error: " + err);
          res.sendStatus(500);
        });
    }
  });
});

app.post("/ImagenSonido", (req, res) => {
  const { marca, titulo, soporte, duracion, numerobibliobus } = req.body;
  ImagenSonido.findAll({
    where: {
      marca: marca,
    },
  }).then((response) => {
    if (response.length > 0) {
      res.send("Ya esta en la base de datos");
    } else {
      const is = new ImagenSonido({
        marca: marca,
        titulo: titulo,
        soporte: soporte,
        duracion: duracion,
        numerobibliobus: numerobibliobus,
      });
      is.save()
        .then(() => {
          res.send("AudioVisual añadido a la base de datos con exito");
        })
        .catch((err) => {
          console.log("Error: " + err);
          res.sendStatus(500);
        });
    }
  });
});

app.delete("/Libros", (req, res) => {
  const { marca } = req.query;
});

module.exports = app;
