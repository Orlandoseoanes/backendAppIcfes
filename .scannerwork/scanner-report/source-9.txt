const { Model, DataTypes } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = require("../conexion");
const Institucion = require("./modeloInstitucional");

const Estudiantes = sequelize.define(
  "Estudiantes",
  {
    Tipo_documento: {
      type: DataTypes.STRING,
    },
    Documento: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
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
    Direccion: {
      type: DataTypes.STRING,
    },
    Colegio: {
      type: DataTypes.STRING,
    },
    Municipio: {
      type: DataTypes.STRING,
    },
    NombreApeAcu: {
      type: DataTypes.STRING,
    },
    TelefonoAcu: {
      type: DataTypes.STRING,
    },
    Estado: {
      type: DataTypes.STRING,
    },
    Nit_institucion: {
      type: DataTypes.BIGINT,
      references: {
        Model: Institucion,
        key: "Nit_institucion",
      },
    },
    Grado:{
      type:DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: "Estudiante",
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Estudiantes;
