const { Model, DataTypes } = require("sequelize");
const sequelize = require("../conexion");
const Institucion = require("./modeloInstitucional");

const Docentes = sequelize.define(
  "Docentes",
  {
    // No incluyas una definición para la columna 'id' si no existe en tu tabla
    Documento: {
      type: DataTypes.BIGINT,
      primaryKey: true, // Esto asume que Documento es tu clave primaria
    },
    Nombre: {
      type: DataTypes.STRING,
    },
    Apellido: {
      type: DataTypes.STRING,
    },
    Telefono: {
      type: DataTypes.STRING,
    },
    Materia_Dicta: {
      type: DataTypes.STRING,
    },
    Cobro: {
      type: DataTypes.BIGINT,
    },
    Nit_institucion: {
      type: DataTypes.BIGINT,
      references: {
        model: Institucion,
        key: "Nit_institucion",
      },
    },
  },
  {
    sequelize,
    modelName: "Docente", // Cambiado a "Docente" para que coincida con el nombre del modelo
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Docentes;
