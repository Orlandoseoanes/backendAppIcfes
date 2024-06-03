const router = require("express").Router();
const ModeloCartera = require("../app/models/modeloCartera");

router.post("/Registro/Cartera", async (req, res) => {
    const { Documento_alumno, Numero_recibo, Pago, Metodo_pago, Fecha, Grado } = req.body;
    try {
        // Validaciones
        if (!Numero_recibo || isNaN(Numero_recibo) || Numero_recibo < 1 || Numero_recibo > 999) {
            return res.status(400).json({ message: 'Número de recibo inválido' });
        }
        if (!Pago || isNaN(Pago) || Pago < 1000 || Pago > 500000) {
            return res.status(400).json({ message: 'Pago inválido' });
        }
        const metodosValidos = ["Efectivo", "Transferencia Nequi", "Transferencia Bancolombia"];
        if (!Metodo_pago || !metodosValidos.includes(Metodo_pago)) {
            return res.status(400).json({ message: 'Método de pago inválido' });
        }
        const fechaActual = new Date();
        const fechaLimite = new Date('2025-12-31');
        if (!Fecha || new Date(Fecha) < fechaActual || new Date(Fecha) > fechaLimite) {
            return res.status(400).json({ message: 'Fecha inválida' });
        }
        const gradosValidos = ["10", "11"];
        if (!Grado || !gradosValidos.includes(Grado)) {
            return res.status(400).json({ message: 'Grado inválido' });
        }

        // Crear nueva cartera si las validaciones pasan
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
            cartera: newCartera,
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

router.get("/Pagos/:Documento_alumno", async (req, res) => {
    const { Documento_alumno } = req.params;
    try {
        const cartera = await ModeloCartera.findAll({
            where: {
                Documento_alumno,
            },
        });
        if (cartera.length === 0) {
            return res.status(404).json({
                message: 'No se encontraron Pagos para el alumno',
            });
        }
        res.status(200).json({
            message: 'Pagos encontrados',
            cartera,
        });
    } catch (error) {
        console.error('Error al obtener los Pagos:', error);
        res.status(500).json({
            message: 'Error interno del servidor',
        });
    }
})



module.exports = router;
