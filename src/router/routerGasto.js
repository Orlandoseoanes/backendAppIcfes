const router = require("express").Router();

const ModeloGasto=require("../app/models/modeloGasto");

router.post("/Registro/Gasto",async (req,res)=>{
    const{Fecha,Tipo_gasto,Gasto,Descripcion,Id_Usuario,Grado}=req.body;

    try{
        const NewGasto=await ModeloGasto.create({
            Fecha,
            Tipo_gasto,
            Gasto,
            Descripcion,
            Id_Usuario,
            Grado
        });
        res.status(201).json({
            message: 'Nuevo Gasto creado exitosamente',
            Gasto: NewGasto, // Cambiado 'curso' a 'cartera' para mayor claridad
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear gasto',
            error,
        });
    
    }
});

router.get("/Gastos/Todos",async (req,res)=>{
    try{
        const NewGasto= await ModeloGasto.findAll();
        console.log('Gastos  encontrados:', NewGasto); // Agrega esta línea para imprimir las instituciones en la consola
        res.status(200).json({
            status: 200,
            data: NewGasto,
        });
    } catch (error) {
        console.error('Error al obtener los Gastos:', error);
        res.status(500).json({
            status: 500,
            message: 'Error interno del servidor',
        });
    }
})

module.exports = router;
