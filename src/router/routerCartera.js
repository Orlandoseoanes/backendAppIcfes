const router = require("express").Router();
const ModeloCartera = require("../app/models/modeloCartera");

router.post("/Registro/Cartera", async (req, res) => {
    const { Documento_alumno, Numero_recibo, Pago, Metodo_pago, Fecha,Grado } = req.body;
    try {
        const newCartera = await ModeloCartera.create({
            Documento_alumno,
            Numero_recibo,
            Pago,
            Metodo_pago,
            Fecha,
            Grado
        });
        res.status(201).json({
            message: 'Nuevo Pago creado exitosamente',
            cartera: newCartera, // Cambiado 'curso' a 'cartera' para mayor claridad
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear Pago',
            error,
        });
    }
});

router.get("/Pagos/Todos",async (req,res)=>{
    try{
        const Newpago = await ModeloCartera.findAll();
        console.log('Pagos  encontrados:', Newpago); // Agrega esta línea para imprimir las instituciones en la consola
        res.status(200).json({
            status: 200,
            data: Newpago,
        });
    } catch (error) {
        console.error('Error al obtener los Pagos:', error);
        res.status(500).json({
            status: 500,
            message: 'Error interno del servidor',
        });
    }
    
});
module.exports = router;
