const router =require("express").Router()
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); 
const { Router } = require("express");
const ModeloEstudiantil= require("../app/models/modeloEstudiante")


//Registro estudiante
router.post('/Registro/Estudiante', async (req, res) => {
    const {
        Tipo_documento,
        Documento,
        Nombre,
        Apellido,
        Telefono,
        Direccion,
        Colegio,
        Municipio,
        NombreApeAcu,
        TelefonoAcu,
        Estado,
        Nit_institucion,
        Grado,
        Usuario,
        Contrasena
    } = req.body;
    console.log(req.body);

    try {
        // Validación del tipo de documento
        const tiposDocumentoValidos = ["Cédula", "Tarjeta de identidad", "Ninguna de las órdenes válidas"];
        if (!tiposDocumentoValidos.includes(Tipo_documento)) {
            throw new Error('Tipo de documento inválido');
        }

        // Validación del documento
        if (typeof Documento !== 'number' || Documento < 10000 || Documento > 9999999999) {
            throw new Error('Documento inválido');
        }

        // Validación del nombre
        if (typeof Nombre !== 'string' || Nombre.length < 5 || Nombre.length > 50) {
            throw new Error('Nombre inválido');
        }

        // Validación del apellido
        if (typeof Apellido !== 'string' || Apellido.length < 5 || Apellido.length > 50) {
            throw new Error('Apellido inválido');
        }

        // Validación del teléfono
        if (typeof Telefono !== 'string' || Telefono.length !== 10) {
            throw new Error('Teléfono inválido');
        }

        // Validación de la dirección
        if (typeof Direccion !== 'string' || Direccion.length < 5 || Direccion.length > 50) {
            throw new Error('Dirección inválida');
        }

        // Validación del colegio
        if (typeof Colegio !== 'string' || Colegio.length < 5 || Colegio.length > 50) {
            throw new Error('Colegio inválido');
        }

        // Validación del municipio
        const municipiosValidos = [
            "Valledupar", "Aguachica", "Codazzi", "Bosconia", "Chimichagua", "Curumaní", "El copey",
            "Chiriguana", "La jagua del ibirico", "La paz", "El paso", "San alberto", "Astrea",
            "Pueblo bello", "San martín", "Pailitas", "Pelaya", "Gamarra", "La gloria", "Río de oro",
            "Tamalameque", "Becerril", "San diego", "Gonzalez", "Manaure"
        ];
        if (!municipiosValidos.includes(Municipio)) {
            throw new Error('Municipio inválido');
        }

        // Validación del nombre del acudiente
        if (typeof NombreApeAcu !== 'string' || NombreApeAcu.length < 5 || NombreApeAcu.length > 50) {
            throw new Error('Nombre del acudiente inválido');
        }

        // Validación del teléfono del acudiente
        if (typeof TelefonoAcu !== 'string' || TelefonoAcu.length !== 10) {
            throw new Error('Teléfono del acudiente inválido');
        }

        // Validación del estado
        const estadosValidos = ["Paz y salvo", "Deudor" ];
        if (!estadosValidos.includes(Estado)) {
            throw new Error('Estado inválido');
        }

        // Validación del grado
        const gradosValidos = ["10", "11"];
        if (!gradosValidos.includes(Grado)) {
            throw new Error('Grado inválido');
        }

        if (!isValidUsuario(Usuario)) {
            return res.status(400).json({
                message: 'Usuario no válido. Debe tener entre 5 y 50 caracteres.'
            });
        }
      
        // Validación para la Contraseña
        if (!isValidContrasena(Contrasena)) {
            return res.status(400).json({
                message: 'Contraseña no válida. Debe tener entre 5 y 50 caracteres.'
            });
        }

        // Crear el estudiante
        const NewEstudiante = await ModeloEstudiantil.create({
            Tipo_documento,
            Documento,
            Nombre,
            Apellido,
            Telefono,
            Direccion,
            Colegio,
            Municipio,
            NombreApeAcu,
            TelefonoAcu,
            Estado,
            Nit_institucion,
            Grado,
            Usuario,
            Contrasena
        });
        res.status(201).json({
            message: 'Estudiante creado exitosamente',
            usuario: NewEstudiante,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Error al crear Estudiante',
            error: error.message,
        });
    }
});
// Función para validar el Usuario
function isValidUsuario(usuario) {
    return typeof usuario === 'string' && usuario.length >= 5 && usuario.length <= 50;
  }
  
  // Función para validar la Contraseña
  function isValidContrasena(contrasena) {
    return typeof contrasena === 'string' && contrasena.length >= 5 && contrasena.length <= 50;
  }

//TODOS LOS ESTUDIANTES
router.get('/Estudiantes/Todos', async (req, res) => { // Corregido el orden de req, res
    try {
        const Estudiantes = await ModeloEstudiantil.findAll();
        console.log('Estudiantes  encontrados:', Estudiantes); // Agrega esta línea para imprimir las instituciones en la consola
        res.status(200).json({
            status: 200,
            data: Estudiantes,
        });
    } catch (error) {
        console.error('Error al obtener los Estudiantes:', error);
        res.status(500).json({
            status: 500,
            message: 'Error interno del servidor',
        });
    }
});

router.get('/Estudiantes/:Documento', async (req, res) => { // Corregido el acceso a los parámetros
    try {
        const { Documento } = req.params; // Acceso al parámetro Nit en lugar de Nit_institucion
        if (!Documento) {
            return res.status(400).json({ error: 'Documento is required' });
        }
        const Estudiante = await ModeloEstudiantil.findOne({
            where: { Documento: Documento } // Utilizar Nit para buscar en lugar de Nit_institucion
            
        });

        if (!Estudiante) {
            return res.status(404).json({ error: 'Estudiante not found' });
        }

        return res.status(200).json(Estudiante);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/Student/login', async (req, res) => {
    const { usuario, contrasena } = req.body;
  
    try {
      const EstudianteEncontrado = await ModeloEstudiantil.findOne({
        where: {
          Usuario: Usuario,
        },
      });
  
      if (!EstudianteEncontrado) {
        return res.status(401).json({
          message: 'Usuario no encontrado',
        });
      }
  
      const esValido = await EstudianteEncontrado.comparePassword(Contrasena);
  
      if (!esValido) {
        return res.status(401).json({
          message: 'Contraseña incorrecta',
        });
      }
  
  
      const payload = {
        nombre: EstudianteEncontrado.Nombre,
        apellido: EstudianteEncontrado.Apellido,
        Nit_institucion:EstudianteEncontrado.Nit_institucion,
        usuario:EstudianteEncontrado.Usuario
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




module.exports=router;