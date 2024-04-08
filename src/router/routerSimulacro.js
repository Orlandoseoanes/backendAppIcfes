const router = require("express").Router();

const ModeloSimulacro=require("../app/models/modeloSimulacro");

router.post("/Registro/Simulacro", async (req, res) => {
    const { Id, Empresa, CuadernillosComprados, Fecha_Simulacro, Grado } = req.body;

    // Validación para la Empresa
    if (!isValidEmpresa(Empresa)) {
        return res.status(400).json({
            message: 'Empresa no válida. Debe tener entre 5 y 50 caracteres.'
        });
    }

    // Validación para Cuadernillos Comprados
    if (!isValidCuadernillosComprados(CuadernillosComprados)) {
        return res.status(400).json({
            message: 'Número de Cuadernillos Comprados no válido. Debe ser un número entre 1 y 500.'
        });
    }

    // Validación para Fecha Simulacro
    if (!isValidFechaSimulacro(Fecha_Simulacro)) {
        return res.status(400).json({
            message: 'Fecha de Simulacro no válida. Debe estar entre la fecha actual y el 31/12/2025.'
        });
    }

    // Validación para Grado
    if (!isValidGrado(Grado)) {
        return res.status(400).json({
            message: 'Grado no válido. Debe ser "10" o "11".'
        });
    }

    try {
        // Obtener la fecha actual formateada
        const fechaActual = new Date();
        const fechaActualFormateada = fechaActual.toISOString().split('T')[0];

        const newSimulacro = await ModeloSimulacro.create({
            Id,
            Empresa,
            CuadernillosComprados,
            Fecha_Simulacro: fechaActualFormateada, // Usar la fecha actual formateada
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
});

// Función para validar la Empresa
function isValidEmpresa(empresa) {
    return typeof empresa === 'string' && empresa.length >= 5 && empresa.length <= 50;
}

// Función para validar Cuadernillos Comprados
function isValidCuadernillosComprados(cuadernillos) {
    return typeof cuadernillos === 'number' && cuadernillos >= 1 && cuadernillos <= 500;
}

// Función para validar Fecha Simulacro
function isValidFechaSimulacro(fecha) {
    const fechaActual = new Date();
    const fechaLimite = new Date('2025-12-31');
    const fechaSimulacro = new Date(fecha);

    // Verificar si la fecha es válida y está dentro del rango
    return fechaSimulacro >= fechaActual && fechaSimulacro <= fechaLimite;
}


// Función para validar Grado
function isValidGrado(grado) {
    return grado === "10" || grado === "11";
}


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