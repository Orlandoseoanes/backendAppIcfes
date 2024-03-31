const router = require("express").Router();

const ModeloSimulacro=require("../app/models/modeloSimulacro");

router.post("/Registro/Simulacro",async (req,res)=>{
    const{Id,Empresa,CuadernillosComprados,Fecha_Simulacro,Grado}=req.body;

    try{
        const newSimulacro= await ModeloSimulacro.create({
            Id,
            Empresa,
            CuadernillosComprados,
            Fecha_Simulacro,
            Grado
        });
        res.status(201).json({
            message: 'Nuevo Simulacro creado exitosamente',
            Simulacro: newSimulacro, 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear Simulacro',
            error,
        });
    }
})


router.get("/Simulacros/TodosSimulacros",async(req,res)=>{
    try {
        const Simulacro = await ModeloSimulacro.findAll();
        console.log('Simulacros  encontrados:', Simulacro); // Agrega esta línea para imprimir las instituciones en la consola
        res.status(200).json({
            status: 200,
            data: Simulacro,
        });
    } catch (error) {
        console.error('Error al obtener los Simulacros:', error);
        res.status(500).json({
            status: 500,
            message: 'Error interno del servidor',
        });
    }
});

module.exports = router;