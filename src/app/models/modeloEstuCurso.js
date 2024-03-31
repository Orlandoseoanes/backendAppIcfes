const { Model, DataTypes } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = require("../conexion");

const Estudiante = require("./modeloEstudiante");

const Curso = require("../model/modeloCurso");

const EstuCurso = sequelize.model(
  "EstuCurso",
  {
    Id_EstuCurso: {
      type: DataTypes.BIGINT,
    },
    Id_Alumno: {
      type: DataTypes.BIGINT,
      references: {
        Model: Estudiante,
        key: "Documento",
      },
    },
    Curso: {
      type: DataTypes.BIGINT,
      references: {
        Model: Curso,
        key: "Id_curso",
      },
    },
  },
  {
    sequelize,
    modelName: "EstuCurso",
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = EstuCurso;
