const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
  }
);

const Files = sequelize.define("Files", {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
  },
  size: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  status: {
    type: DataTypes.CHAR("200"),
    defaultValue: "Pending",
  },
  filePath: {
    type: DataTypes.TEXT,
  },
  zippedFilePath: {
    type: DataTypes.TEXT,
  },
});

module.exports = { Files };
