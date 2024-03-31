const router =require("express").Router()
const { Router } = require("express");

const modeloDocente=require("../app/models/modeloDocente");

//registro docente
router.post("/Registro/Docente",async(req,res)=>{
    const{
        Documento,Nombre,Apellido,Telefono,Materia_Dicta,Cobro,Nit_institucion
    }=req.body
    try{
        const NewDocente= await modeloDocente.create({
            Documento,Nombre,Apellido,Telefono,Materia_Dicta,Cobro,Nit_institucion
        });
        res.status(201).json({
            message: 'Docente creado exitosamente',
            Docente: NewDocente,
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({
            message: 'Error al crear Docente',
            error,
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