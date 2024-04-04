const router =require("express").Router()
const { Router } = require("express");

const modeloDocente=require("../app/models/modeloDocente");

//registro docente
router.post("/Registro/Docente", async (req, res) => {
    const {
        Documento, Nombre, Apellido, Telefono, Materia_Dicta, Cobro, Nit_institucion
    } = req.body;

    // Función para validar si un número está dentro de un rango
    const isWithinRange = (number, min, max) => {
        return number >= min && number <= max;
    };

    try {
        // Validar el documento
        if (!Documento || typeof Documento !== 'number' || !isWithinRange(Documento, 10000, 9999999999)) {
            throw new Error('Documento inválido');
        }

        // Validar el nombre
        if (!Nombre || typeof Nombre !== 'string' || Nombre.length < 5 || Nombre.length > 50) {
            throw new Error('Nombre inválido');
        }

        // Validar el apellido
        if (!Apellido || typeof Apellido !== 'string' || Apellido.length < 5 || Apellido.length > 50) {
            throw new Error('Apellido inválido');
        }

        // Validar el teléfono
        if (!Telefono || typeof Telefono !== 'string' || Telefono.length !== 10) {
            throw new Error('Teléfono inválido');
        }

        // Validar la materia dictada
        const materiasValidas = ["Español", "Inglés", "Sociales", "Biologia", "Química", "Fisica", "Matematica"];
        if (!Materia_Dicta || !materiasValidas.includes(Materia_Dicta)) {
            throw new Error('Materia dictada inválida');
        }

        // Validar el cobro
        if (!Cobro || typeof Cobro !== 'number' || !isWithinRange(Cobro, 10000, 500000)) {
            throw new Error('Cobro inválido');
        }

        // El resto de validaciones para Nit_institucion u otros campos pueden agregarse aquí

        // Si todas las validaciones pasan, crear el docente
        const newDocente = await modeloDocente.create({
            Documento, Nombre, Apellido, Telefono, Materia_Dicta, Cobro, Nit_institucion
        });

        res.status(201).json({
            message: 'Docente creado exitosamente',
            Docente: newDocente,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Error en la creación del docente',
            error: error.message,
        });
    }
});
//todos los docentes

router.get('/Docentes/Todos', async (req, res) => { // Corregido el orden de req, res
    try {
        const Docente = await modeloDocente.findAll();
        console.log('Cursos  encontrados:', Docente); // Agrega esta línea para imprimir las instituciones en la consola
        res.status(200).json({
            status: 200,
            data: Docente,
        });
    } catch (error) {
        console.error('Error al obtener los Docente:', error);
        res.status(500).json({
            status: 500,
            message: 'Error interno del servidor',
        });
    }
});

//DOCENTES POR CEDULA
router.get('/Docentes/:Documento', async (req, res) => { // Corregido el acceso a los parámetros
    try {
        const { Documento } = req.params; // Acceso al parámetro Nit en lugar de Nit_institucion
        if (!Documento) {
            return res.status(400).json({ error: 'Documento is required' });
        }
        const Docente = await modeloDocente.findOne({
            where: { Documento: Documento } // Utilizar Nit para buscar en lugar de Nit_institucion
            
        });

        if (!Docente) {
            return res.status(404).json({ error: 'Docente not found' });
        }

        return res.status(200).json(Docente);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports=router;