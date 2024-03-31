const { Model, DataTypes } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = require("../conexion");

const Estudiante = require("./modeloEstudiante");

const Cartera = sequelize.define(
  "Carteras",
  {
    Documento_alumno: {
      type: DataTypes.BIGINT,
      references: {
        Model: Estudiante,
        key: "Documento",
      },
    },
    Id_Pago: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true, // Corregido el nombre de la propiedad y agregado el autoincremental
    },
    Numero_recibo: {
      type: DataTypes.STRING,
    },
    Pago: {
      type: DataTypes.BIGINT,
    },
    Metodo_pago: {
      type: DataTypes.STRING,
    },
    Fecha: {
      type: DataTypes.DATE,
    },
    Grado:{
      type:DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: "Cartera",
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Cartera;
