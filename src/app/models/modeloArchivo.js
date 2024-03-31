const { Model, DataTypes } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = require("../conexion");

const Gasto = require("./modeloGasto");

const Archivo = sequelize.Model(
  "Archivo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    archivo: {
      type: DataTypes.TEXT, // Cambiado a BLOB para almacenar archivos binarios
    },
    Fecha: {
      type: DataTypes.DATE,
    },
    Id_Gasto: {
      type: DataTypes.BIGINT,
      references: {
        Model: Gasto,
        key: "Id_gasto",
      },
    },
  },
  {
    sequelize,
    modelName: "Archivo",
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Archivo;
