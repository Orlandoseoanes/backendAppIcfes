const { Router } = require("express");
const router = Router(); // Use this single declaration for router

const ModeloInstitucion = require('../app/models/modeloInstitucional');

// REGISTRO INSTITUCION 
router.post('/Instituciones', async (req, res) => { // Corrected order of req, res
    const { Nombre_Institucion, Nit_institucion } = req.body;

    try {
        const NewInstitucion = await ModeloInstitucion.create({
            Nombre_Institucion,
            Nit_institucion
        });

        res.status(201).json({
            message: 'Institucion creado exitosamente',
            Institucion: NewInstitucion,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear Institucion',
            error,
        });
    }
});

//TRAER TODAS LAS INSTITUCIONES

router.get('/Instituciones', async (req, res) => { // Corregido el orden de req, res
    try {
        const Instituciones = await ModeloInstitucion.findAll();
        console.log('Instituciones encontradas:', Instituciones); // Agrega esta línea para imprimir las instituciones en la consola
        res.status(200).json({
            status: 200,
            data: Instituciones,
        });
    } catch (error) {
        console.error('Error al obtener las Instituciones:', error);
        res.status(500).json({
            status: 500,
            message: 'Error interno del servidor',
        });
    }
});

//TRAER INSTITUCIONES POR NIT
router.get('/instituciones/:Nit', async (req, res) => { // Corregido el acceso a los parámetros
    try {
        const { Nit } = req.params; // Acceso al parámetro Nit en lugar de Nit_institucion
        if (!Nit) {
            return res.status(400).json({ error: 'Nit is required' });
        }
        const Institucion = await ModeloInstitucion.findOne({
            where: { Nit_institucion: Nit } // Utilizar Nit para buscar en lugar de Nit_institucion
            
        });

        if (!Institucion) {
            return res.status(404).json({ error: 'Institucion not found' });
        }

        return res.status(200).json(Institucion);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
