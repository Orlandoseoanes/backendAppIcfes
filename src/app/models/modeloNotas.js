const { Model, DataTypes } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = require("../conexion");

const Estudiante = require("./modeloEstudiante");

const Simulacro = require("./modeloSimulacro");

const Notas = sequelize.define("Notas", {
    id:{
        type:DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },

  Id_Simulacro: {
    type: DataTypes.STRING,
    references:{
        Model:Simulacro,
        key:"Id"
    }
  },
  Id_Alumno: {
    type: DataTypes.BIGINT,
    references: {
      Model: Estudiante,
      key: "Documento",
    },
  },
  Nota_LecturaCritica: {
    type: DataTypes.BIGINT,
  },
  Nota_Matematicas: {
    type: DataTypes.BIGINT,
  },
  Nota_Sociales: {
    type: DataTypes.BIGINT,
  },
  Nota_Naturales: {
    type: DataTypes.BIGINT,
  },
  Nota_Ingles: {
    type: DataTypes.BIGINT,
  },
  Global: {
    type: DataTypes.BIGINT,
  },
}, {
    timestamps: false, // Desactivar la creación automática de createdAt y updatedAt
});

module.exports=Notas;