const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: "mysql",
});

const Files = sequelize.define("Files", {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.CHAR("200"),
    defaultValue: "Pending",
  },
  file: {
    type: DataTypes.BLOB("medium"),
    // allowNull defaults to true
  },
  zippedFile: {
    type: DataTypes.BLOB("medium"),
  },
});

module.exports = { Files };
