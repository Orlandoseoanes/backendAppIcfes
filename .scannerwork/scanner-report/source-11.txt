const { Model, DataTypes } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = require("../conexion");

const Institucion = sequelize.define(
  "Instituciones",
  {
    Nit_institucion: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    Nombre_Institucion: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    modelName: "Instituciones",
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Institucion;
