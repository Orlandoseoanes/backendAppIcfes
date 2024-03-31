const { Model, DataTypes } = require("sequelize");

// Option 3: Passing parameters separately (other dialects)
const sequelize = require("../conexion");


const Simulacro = sequelize.define(
  "simulacros",
  {
    Id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    Empresa:{
      type:DataTypes.STRING
    },
    CuadernillosComprados:{
      type:DataTypes.BIGINT
    },
   
    Fecha_Simulacro: {
      type: DataTypes.DATE,
    },
    Grado:{
      type:DataTypes.STRING
    }
    
  },
  {
    sequelize,
    modelName: "Simulacros",
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Simulacro;
