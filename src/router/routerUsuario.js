const router =require("express").Router()
const bcrypt = require('bcrypt');
const modelosUsuario=require('../app/models/modelosusuario')
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Importa la biblioteca jsonwebtoken
const { Router } = require("express");


//REGISTRO USUARIO
router.post('/Usuario/Registro', async (req, res) => {
  const { cedula, nombre, apellido, usuario, contrasena, Nit_institucion } = req.body;

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



module.exports=router;