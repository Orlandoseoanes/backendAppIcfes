const router =require("express").Router()
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Importa la biblioteca jsonwebtoken
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
        Grado
    } = req.body;

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
            Grado
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


module.exports=router;