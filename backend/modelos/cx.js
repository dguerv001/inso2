const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bibibus", "root", "root*", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = { sequelize };
