const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

// Option 3: Passing parameters separately (other dialects)
const sequelize = require("../conexion");
const Institucion = require("./modeloInstitucional");

const Usuario = sequelize.define(
  "Usuario",
  {
    cedula: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    apellido: {
      type: DataTypes.STRING,
    },

    usuario: {
      type: DataTypes.STRING,
      unique: true,
    },
    contrasena: {
      type: DataTypes.STRING,
    },
    Nit_institucion: {
      type: DataTypes.BIGINT,
      references: {
        Model: Institucion,
        key: "Nit_institucion",
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (usuario) => {
        // Hash de la contraseña solo si se proporciona
        if (usuario.contrasena) {
          usuario.contrasena = await bcrypt.hash(usuario.contrasena, 10);
        }
      },
    },
    sequelize,
    modelName: "Usuario",
    createdAt: false,
    updatedAt: false,
  }
);

// Método para comparar contraseñas durante la autenticación
Usuario.prototype.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.contrasena);
};

module.exports = Usuario;
