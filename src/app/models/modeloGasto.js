const { Model, DataTypes } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = require("../conexion");

const Gastos = sequelize.define(
  "Gastos",
  {
    Id_gasto: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    Fecha: {
      type: DataTypes.DATE,
    },
    Tipo_gasto: {
      type: DataTypes.STRING,
    },
    Gasto: {
      type: DataTypes.BIGINT,
    },
    Descripcion: {
      type: DataTypes.STRING,
    },
    Grado:{
      type:DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: "Gastos",
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Gastos;
