const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;
const cors = require("cors");
const Sequelize = require("sequelize");
//const hashMode = require("blueimp-md5/js/md5.min.js");
const sequelize = new Sequelize("Bibibus", "root", "root*", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Base de datos conectada correctamente y lista para su uso");
  })
  .catch((err) => {
    console.error("Conexión con base de datos errónea", err);
  });

const Bibliobus = require("./modelos/Bibliobuses");
const Persona = require("./destinos/Personas");
const Fondo = require("./destinos/Fondos");

sequelize.sync({
  force: false,
}); //poner a true para sincronizar cambios

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/Bibliobuses", require("./destinos/Bibliobuses"));
app.use("/Personas", require("./destinos/Personas"));
app.use("/Fondos", require("./destinos/Fondos"))

app.listen(port, function () {
  console.log("Base de datos conectada en puerto: " + port + "!\n\n");
});
