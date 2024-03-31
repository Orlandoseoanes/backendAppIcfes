const router =require("express").Router()
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Importa la biblioteca jsonwebtoken
const { Router } = require("express");
const ModeloEstudiantil= require("../app/models/modeloEstudiante")


//Registro estudiante
router.post('/Registro/Estudiante',async(req,res)=>{
    const {Tipo_documento,Documento,Nombre,Apellido,Telefono,Direccion,Colegio,
        Municipio,NombreApeAcu,TelefonoAcu,Estado,Nit_institucion,Grado}=req.body
        try{
            const NewEstudiante =await ModeloEstudiantil.create({
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
            res.status(404).json({
                message: 'Error al crear Estudiante',
                error,
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