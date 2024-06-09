const router =require("express").Router()
const bcrypt = require('bcrypt');
const modelosUsuario=require('../app/models/modelosusuario')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Importa la biblioteca jsonwebtoken
const { Router } = require("express");
const modelosGastos = require('../app/models/modeloGasto');


//REGISTRO USUARIO
router.post('/Usuario/Registro', async (req, res) => {
  const { cedula, nombre, apellido, usuario, contrasena, Nit_institucion } = req.body;

  // Validación para la Cédula
  if (!isValidCedula(cedula)) {
      return res.status(400).json({
          message: 'Cédula no válida. Debe ser un número entre 10000 y 9999999999.'
      });
  }

  // Validación para el Nombre
  if (!isValidNombre(nombre)) {
      return res.status(400).json({
          message: 'Nombre no válido. Debe tener entre 5 y 50 caracteres.'
      });
  }

  // Validación para el Apellido
  if (!isValidApellido(apellido)) {
      return res.status(400).json({
          message: 'Apellido no válido. Debe tener entre 5 y 50 caracteres.'
      });
  }

  // Validación para el Usuario
  if (!isValidUsuario(usuario)) {
      return res.status(400).json({
          message: 'Usuario no válido. Debe tener entre 5 y 50 caracteres.'
      });
  }

  // Validación para la Contraseña
  if (!isValidContrasena(contrasena)) {
      return res.status(400).json({
          message: 'Contraseña no válida. Debe tener entre 5 y 50 caracteres.'
      });
  }

  try {
      const newUsuario = await modelosUsuario.create({
          cedula,
          nombre,
          apellido,
          usuario,
          contrasena,
          Nit_institucion: Nit_institucion,
      });
      res.status(201).json({
          message: 'Usuario creado exitosamente',
          usuario: newUsuario,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({
          message: 'Error al crear usuario',
          error,
      });
  }
});

// Función para validar la Cédula
function isValidCedula(cedula) {
  return Number.isInteger(cedula) && cedula >= 10000 && cedula <= 9999999999;
}

// Función para validar el Nombre
function isValidNombre(nombre) {
  return typeof nombre === 'string' && nombre.length >= 5 && nombre.length <= 50;
}

// Función para validar el Apellido
function isValidApellido(apellido) {
  return typeof apellido === 'string' && apellido.length >= 5 && apellido.length <= 50;
}

// Función para validar el Usuario
function isValidUsuario(usuario) {
  return typeof usuario === 'string' && usuario.length >= 5 && usuario.length <= 50;
}

// Función para validar la Contraseña
function isValidContrasena(contrasena) {
  return typeof contrasena === 'string' && contrasena.length >= 5 && contrasena.length <= 50;
}


//login
router.post('/login', async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const usuarioEncontrado = await modelosUsuario.findOne({
      where: {
        usuario: usuario,
      },
    });

    if (!usuarioEncontrado) {
      return res.status(401).json({
        message: 'Usuario no encontrado',
      });
    }

    const esValido = await usuarioEncontrado.comparePassword(contrasena);

    if (!esValido) {
      return res.status(401).json({
        message: 'Contraseña incorrecta',
      });
    }


    const payload = {
      cedula: usuarioEncontrado.cedula,
      nombre: usuarioEncontrado.nombre,
      apellido: usuarioEncontrado.apellido,
      Nit_institucion:usuarioEncontrado.Nit_institucion,
      usuario:usuarioEncontrado.usuario
    };

    const token = jwt.sign(payload, 'secretoDelToken'); // Cambia 'secretoDelToken' por tu secreto real

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      status:200,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al iniciar sesión',
      error,
    });
  }
});

//todos los usuarios

router.get("/Usuario/Todosusuarios", async (req, res) => {
  try {
    const usuarios = await modelosUsuario.findAll(); // Obtener todos los usuarios

    res.status(200).json({
      message: 'Usuarios obtenidos exitosamente',
      usuarios: usuarios,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al obtener usuarios',
      error,
    });
  }
});

//usuario por id
router.get("/Usuario/:cedula", async (req, res) => {
  const cedula = req.params.cedula;

  try {
    const usuario = await modelosUsuario.findOne({
      where: {
        cedula: cedula,
      },
    });

    if (!usuario) {
      return res.status(404).json({
        message: 'Usuario no encontrado',
      });
    }

    res.status(200).json({
      message: 'Usuario encontrado exitosamente',
      usuario: usuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al obtener usuario',
      error,
    });
  }
});


router.put("/Usuario/:cedula", async (req, res) => {
  const cedula = req.params.cedula;
  const nuevosDatosUsuario = req.body; // Los nuevos datos del usuario que vienen en el cuerpo de la solicitud
  try {
    // Busca el usuario que se va a actualizar
    const usuario = await modelosUsuario.findOne({
      where: {
        cedula: cedula,
      },
    });

    if (!usuario) {
      return res.status(404).json({
        message: 'Usuario no encontrado',
      });
    }

    // Actualiza los registros de gastos relacionados con el usuario si es necesario
    if (nuevosDatosUsuario.hasOwnProperty('id')) {
      await modelosGastos.update(
        { Id_Usuario: nuevosDatosUsuario.id },
        { where: { Id_Usuario: usuario.id } }
      );
    }

    // Actualiza todos los datos del usuario
    await usuario.update(nuevosDatosUsuario);

    res.status(200).json({
      message: 'Usuario actualizado exitosamente',
      usuario: usuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al actualizar usuario',
      error,
    });
  }
});




module.exports=router;