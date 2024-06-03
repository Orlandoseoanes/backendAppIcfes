const router =require("express").Router()
const { Router } = require("express");

const modeloDocente=require("../app/models/modeloDocente");
const { where } = require("../app/models/modeloContenidoPractica");
const { Where } = require("sequelize/lib/utils");

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

//ACTUALIZAR DOCENTE
router.put("/Docente/:Documento", async (req, res) => {
    const { Documento } = req.params;
    const {
         Nombre, Apellido, Telefono, Materia_Dicta, Cobro, Nit_institucion
    } = req.body;

    try {
        // Verificar si el ID proporcionado es válido
        if (!Documento || isNaN(Number(Documento))) {
            return res.status(400).json({ error: "ID de docente no válido" });
        }

        // Buscar el docente por su ID en la base de datos
        const docente = await modeloDocente.findByPk(Documento);

        // Si el docente no se encuentra, devolver un error
        if (!docente) {
            return res.status(404).json({ error: "Docente no encontrado" });
        }

        // Actualizar los datos del docente con los valores proporcionados en el cuerpo de la solicitud
        await docente.update({
            Nombre, Apellido, Telefono, Materia_Dicta, Cobro, Nit_institucion
        });

        // Devolver una respuesta indicando que el docente ha sido actualizado con éxito
        return res.json({
            Documento,
            Nombre,
            Apellido,
            Telefono,
            Materia_Dicta,
            Cobro,
            Nit_institucion,
            message: "Docente actualizado exitosamente"
        });
    } catch (error) {
        console.error("Error al actualizar el docente:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});

//BORRAR DOCENTE
router.delete("/Docente/:Documento", async (req, res) => {
    const { Documento } = req.params; // Obtener el ID del docente de los parámetros de la URL

    // Verificar si el ID proporcionado es válido
    if (!Documento) {
        return res.status(400).json({ error: "ID de docente no válido" });
    }

    try {
        // Buscar el docente por su ID en la base de datos
        const docente = await modeloDocente.findOne({
            where: { Documento: Documento } // Utilizar Nit para buscar en lugar de Nit_institucion 
        });


        // Si el docente no se encuentra, devolver un error
        if (!docente) {
            return res.status(404).json({ error: "Docente no encontrado" });
        }

        // Eliminar el docente de la base de datos
        await docente.destroy();

        // Devolver una respuesta indicando que el docente ha sido eliminado con éxito
        return res.json({ message: "Docente eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el docente:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});




module.exports=router;