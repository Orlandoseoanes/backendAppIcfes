const { Model, DataTypes } = require("sequelize");
const sequelize = require("../conexion");
const Institucion = require("./modeloInstitucional");

const Practica = sequelize.define(
  "Practica",
  {
    Id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    Id_institucion: {
      type: DataTypes.BIGINT,
      references: {
        Model: Institucion,
        key: "Nit_institucion",
      },
    },
  },
  {
   
    sequelize,
    modelName: "Practica",
    createdAt: false,
    updatedAt: false,
  }
);



module.exports = Practica;
