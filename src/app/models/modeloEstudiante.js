const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

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
    },
    Usuario: {
      type: DataTypes.STRING,
      unique: true,
    },
    Contrasena: {
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: async (estudiante) => {
        // Hash de la contraseña solo si se proporciona
        if (estudiante.Contrasena) {
          estudiante.Contrasena = await bcrypt.hash(estudiante.Contrasena, 10);
        }
      },
    },

    sequelize,
    modelName: "Estudiante",
    createdAt: false,
    updatedAt: false,
  },
  
    
  
);

Estudiantes.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.Contrasena);
};


module.exports = Estudiantes;
