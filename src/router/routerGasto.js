const router = require("express").Router();

const ModeloGasto=require("../app/models/modeloGasto");

router.post("/Registro/Gasto", async (req, res) => {
    const { Fecha, Tipo_gasto, Gasto, Descripcion, Grado } = req.body;

    try {

        // Validación 2: Verificar que Gasto sea un número entre 200 y 20,000,000
        if (isNaN(Gasto) || Gasto < 200 || Gasto > 20000000) {
            return res.status(400).json({ message: 'El valor del gasto no es válido' });
        }

        // Validación 3: Verificar que Descripcion tenga una longitud válida
        if (typeof Descripcion !== 'string' || Descripcion.length < 2 || Descripcion.length > 80) {
            return res.status(400).json({ message: 'La descripción no es válida' });
        }

   
        // Crear nuevo gasto si pasa todas las validaciones
        const NewGasto = await ModeloGasto.create({
            Fecha,
            Tipo_gasto,
            Gasto,
            Descripcion,
            Grado
        });

        res.status(201).json({
            message: 'Nuevo Gasto creado exitosamente',
            Gasto: NewGasto,
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
