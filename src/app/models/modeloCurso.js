const { Model, DataTypes } = require("sequelize");
const sequelize = require("../conexion");

const Curso = sequelize.define(
    "Curso", // Nombre del modelo
    {
        Id_curso: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true // Si el Id_curso es autoincremental
        },
        Nombre_curso: {
            type: DataTypes.STRING,
        },
        Grado:{
            type:DataTypes.STRING
          }
    },
    {
        sequelize,
        modelName: "Curso",
        createdAt: false,
        updatedAt: false,
    }
);

module.exports = Curso;
