const exp = require("express");
const Reservas = require("../modelos/Reservas");
var app = exp.Router();

app.get("/", (req, res) => {
  const { idUsuario } = req.query;
  Reservas.findAll({
    where: {
      idUsuario: idUsuario,
    },
  }).then((response) => {
    res.send(response);
  });
});

app.post("/", (req, res) => {
  const { marca, idUsuario, idPoblacion } = req.body;
  const prestamo = new Date();
  var devolucion = new Date();
  const month = devolucion.getMonth() + 1;
  devolucion.setMonth(month);
  console.log("Nueva reserva para " + marca + " idUsuario " + idUsuario);
  const fondo = new Reservas({
    idFondo: marca,
    idUsuario: idUsuario,
    idPoblacion: idPoblacion,
    fechaPrestamo: prestamo,
    fechaDevolucion: devolucion,
  });
  fondo
    .save()
    .then(() => {
      res.send("Disfrute de su préstamo");
    })
    .catch((err) => {
      console.log(err);
      res.send("El préstamo ha sido anulado, consulte con el bibliotecario");
    });
});

app.delete("/", async (req, res) => {
  const { idFondo } = req.query;
  console.log("Devolución del préstamo con signatura " + idFondo);
  await Reservas.findAll({
    where: {
      idFondo: idFondo,
    },
  }).then((response) => {
    var prevista = response[0].fechaDevolucion.split("-")[1];
    var hoy = new Date();

    response[0].destroy();
    console.log(prevista);
    console.log(hoy.getMonth() + 1);
    if (prevista < hoy.getMonth() + 1) {
      hoy.setMonth(hoy.getMonth() + 2);
      const opciones = {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      };
      sancion = hoy.toLocaleDateString("es-ES", opciones);
      console.log("Usuario sancionado hasta el " + sancion);
      res.send("Está sancionado hasta el día " + sancion);
    } else {
      res.send("0");
    }
  });
});

module.exports = app;
