const { Router } = require("express");
const router = Router(); // Use this single declaration for router

const ModeloCurso = require("../app/models/modeloCurso");

//registrar cursos
router.post("/Registro/Curso", async (req, res) => {
    const { Nombre_curso,Grado } = req.body; // Obtener Nombre_curso del cuerpo de la solicitud (req.body)

    try {
        const newCurso = await ModeloCurso.create({
            Nombre_curso,
            Grado
        });
        res.status(201).json({
            message: 'Curso creado exitosamente',
            curso: newCurso,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear Curso',
            error,
        });
    }
});

//todos los cursos
router.get('/Curso/Todos', async (req, res) => { // Corregido el orden de req, res
    try {
        const Curso = await ModeloCurso.findAll();
        console.log('Cursos  encontrados:', Curso); // Agrega esta línea para imprimir las instituciones en la consola
        res.status(200).json({
            status: 200,
            data: Curso,
        });
    } catch (error) {
        console.error('Error al obtener los Cursos:', error);
        res.status(500).json({
            status: 500,
            message: 'Error interno del servidor',
        });
    }
});





module.exports = router;
