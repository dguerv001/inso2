const exp = require("express");
const Persona = require("../modelos/Personas");
const Usuarios = require("../modelos/Usuarios");
const Trabajadores = require("../modelos/Trabajadores");
const { where } = require("sequelize");
var app = exp.Router();

app.get("/", (req, res) => {
  const { email, clave } = req.query;

  Persona.findAll({
    where: {
      email: email,
      password: clave,
    },
  }).then((response) => {
    res.send(response);
  });
});

app.get("/localiza", (req, res) => {
  const { usuario, dni } = req.query;
  console.log(usuario);
  Persona.findAll({
    where: {
      dni: dni,
      nombre: usuario,
    },
  }).then((response) => {
    res.send(response);
  });
});

app.get("/Usuarios", (req, res) => {
  let usuarios = [];
  Usuarios.findAll({}).then(async (response) => {
    for (var i = 0; i < response.length; i++) {
      await Persona.findAll({
        where: {
          dni: response[i].dni,
        },
      }).then((persona) => {
        var usuario = { persona: persona[0], ban: response[i].ban };
        usuarios.push(usuario);
      });
    }
    res.send(usuarios);
  });
});

app.get("/TodosUsuarios", (req, res) => {
  Usuarios.findAll({}).then((response) => {
    res.send(response);
  });
});

app.get("/Usuarios/penalizados", (req, res) => {
  let usuarios = [];
  Usuarios.findAll({}).then(async (response) => {
    for (var i = 0; i < response.length; i++) {
      await Persona.findAll({
        where: {
          dni: response[i].dni,
        },
      }).then((persona) => {
        var usuario = {
          persona: persona[0],
          ban: response[i].ban,
          fechaFinBan: response[i].fechaFinBan,
        };
        if (usuario.ban == true) usuarios.push(usuario);
      });
    }
    res.send(usuarios);
  });
});

app.get("/Usuarios/activos", (req, res) => {
  let usuarios = [];
  Usuarios.findAll({}).then(async (response) => {
    for (var i = 0; i < response.length; i++) {
      await Persona.findAll({
        where: {
          dni: response[i].dni,
        },
      }).then((persona) => {
        var usuario = { persona: persona[0], ban: response[i].ban };
        if (usuario.ban == false) usuarios.push(usuario);
      });
    }
    res.send(usuarios);
  });
});

app.put("/Penaliza", (req, res) => {
  const { idUsuario } = req.body;
  console.log("Procediento a la penalización del usuario");
  Usuarios.findAll({
    where: {
      id: idUsuario,
    },
  }).then((response) => {
    response[0].ban = 1;
    var hoy = new Date();
    hoy.setMonth(hoy.getMonth() + 2);
    response[0].fechaFinBan = hoy;
    response[0].save().then(() => {
      res.sendStatus(200);
    });
  });
});

app.put("/desPenaliza", (req, res) => {
  const { dni } = req.body;
  console.log("Procediento a la despenalización del usuario");
  Usuarios.findAll({
    where: {
      dni: dni,
    },
  }).then((response) => {
    response[0].ban = 0;
    response[0].fechaFinBan = null;
    response[0].save().then(() => {
      res.sendStatus(200);
    });
  });
});

app.get("/Conductores", (req, res) => {
  let usuarios = [];
  Trabajadores.findAll({}).then(async (response) => {
    for (var i = 0; i < response.length; i++) {
      await Persona.findAll({
        where: {
          dni: response[i].dni,
        },
      }).then((persona) => {
        usuarios.push(persona[0]);
      });
    }
    res.send(usuarios);
  });
});

app.post("/", (req, res) => {
  const { nombre, apellidos, direccion, parada, dni, telefono, email, clave } =
    req.body;
  Persona.findAll({
    where: {
      dni: dni,
    },
  }).then((response) => {
    if (response.length > 0) {
      res.send("La persona ya está en la base de datos");
    } else {
      const p = new Persona({
        dni: dni,
        rol: "Lector",
        nombre: nombre,
        apellidos: apellidos,
        direccion: direccion,
        poblacion: parada,
        telefono: telefono,
        email: email,
        password: clave,
      });

      p.save().then(() => {
        var u = new Usuarios({ dni: dni, ban: 0 });
        u.save()
          .then(() => {
            res.send("Persona añadida a la base de datos");
          })
          .catch((err) => {
            console.log("Se ha producido un error en la base de datos: " + err);

            res.sendStatus(500);
          });
      });
    }
  });
});

app.post("/Conductor", (req, res) => {
  const {
    nombre,
    apellidos,
    direccion,
    parada,
    dni,
    telefono,
    email,
    clave,
    bibliobus,
  } = req.body;
  Persona.findAll({
    where: {
      dni: dni,
    },
  }).then((response) => {
    if (response.length > 0) {
      res.send("La persona ya está en la base de datos");
    } else {
      const p = new Persona({
        dni: dni,
        rol: "Conductor",
        nombre: nombre,
        apellidos: apellidos,
        direccion: direccion,
        poblacion: parada,
        telefono: telefono,
        email: email,
        password: clave,
      });

      p.save().then(() => {
        var u = new Trabajadores({ dni: dni, numerobibliobus: bibliobus });
        u.save()
          .then(() => {
            res.send("Persona añadida a la base de datos");
          })
          .catch((err) => {
            console.log("Se ha producido un error en la base de datos: " + err);

            res.sendStatus(500);
          });
      });
    }
  });
});

app.put("/", (req, res) => {
  const { dni, nombre, apellidos, direccion, telefono, email, password } =
    req.body;
  var clave = clave;
  Persona.findAll({
    where: {
      dni: dni,
    },
  }).then((response) => {
    if (password === undefined) clave = response[0].password;
    console.log(response[0].password);
    if (response.length > 0) {
      response[0].dni = dni;
      response[0].nombre = nombre;
      response[0].apellidos = apellidos;
      response[0].direccion = direccion;
      response[0].telefono = telefono;
      response[0].email = email;
      response[0].password = clave;
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

app.put("/Conductor", (req, res) => {
  const {
    dni,
    nombre,
    apellidos,
    direccion,
    telefono,
    email,
    password,
    bibliobus,
  } = req.body;
  console.log("Actualizando los datos para " + dni);
  var clave = clave;
  Persona.findAll({
    where: {
      dni: dni,
    },
  }).then((response) => {
    if (password === undefined) clave = response[0].password;
    console.log(response[0].password);
    if (response.length > 0) {
      response[0].dni = dni;
      response[0].nombre = nombre;
      response[0].apellidos = apellidos;
      response[0].direccion = direccion;
      response[0].telefono = telefono;
      response[0].email = email;
      response[0].password = clave;
      response[0]
        .save()
        .then((a) => {
          Trabajadores.findAll({
            where: {
              dni: dni,
            },
          }).then((respuesta) => {
            respuesta[0].dni = dni;
            respuesta[0].numerobibliobus = bibliobus;
            respuesta[0]
              .save()
              .then(() => {
                res.send("Modificado el trabajador " + nombre);
              })
              .catch((err) => {
                console.log(
                  "Se ha producido un error en la base de datos: " + err
                );

                res.sendStatus(500);
              });
          });
        })
        .catch((err) => {
          console.log("Error: " + err);
        });
    }
  });
});

app.delete("/", (req, res) => {
  const { dni } = req.query;
  Persona.findAll({
    where: {
      dni: dni,
    },
  }).then((response) => {
    if (response.length > 0) {
      console.log(response);
      response[0].destroy();
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });
});

module.exports = app;
