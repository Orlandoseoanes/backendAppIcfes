const router =require("express").Router()
const { Router } = require("express");
const xlsx = require("xlsx");
const Notas =require("../app/models/modeloNotas");
const multer = require("multer");
const { Op } = require('sequelize');


const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/Notas/cargar-excel", upload.single("archivo"), async (req, res) => {
  if (req.file) {
      // Lectura del archivo Excel en memoria
      const workbook = xlsx.read(req.file.buffer);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      // Conversión de la hoja de cálculo a un array de objetos
      const data = xlsx.utils.sheet_to_json(worksheet);
      for (const obj of data) {
          const {
              id,
              Id_Simulacro,
              Id_Alumno,
              Nota_LecturaCritica,
              Nota_Matematicas,
              Nota_Sociales,
              Nota_Naturales,
              Nota_Ingles,
              Global,
          } = obj;
          console.log(data);


          // Validaciones de las notas antes de guardarlas
          if (
              !isValidNota(Nota_LecturaCritica) ||
              !isValidNota(Nota_Matematicas) ||
              !isValidNota(Nota_Sociales) ||
              !isValidNota(Nota_Naturales) ||
              !isValidNota(Nota_Ingles) ||
              !isValidGlobal(Global)
          ) {
              res.status(400).json({
                  success: false,
                  message: "Las notas proporcionadas no son válidas. Por favor, revise las condiciones de entrada.",
              });
              return;
          }

          try {
              const newNota = await Notas.create({
                  id,
                  Id_Simulacro,
                  Id_Alumno,
                  Nota_LecturaCritica,
                  Nota_Matematicas,
                  Nota_Sociales,
                  Nota_Naturales,
                  Nota_Ingles,
                  Global,
              });
          } catch (error) {
              console.error(error);
              res.status(500).json({
                  success: false,
                  message: "Error al guardar la nota",
                  error,
              });
              return;
          }
      }

      // Respuesta con mensaje de confirmación
      res.json({
          success: true,
          message: "Archivo Excel recibido y procesado correctamente. Las notas se han guardado en la base de datos.",
      });
  } else {
      res.status(400).json({
          success: false,
          message: "Error al subir el archivo. Intente de nuevo.",
      });
  }
});

// Función para validar la nota
function isValidNota(nota) {
    return typeof nota === 'number' && Number.isInteger(nota) && nota >= 0 && nota <= 100;
}

// Función para validar que la nota global sea un número entero dentro del rango de 0 a 500
function isValidGlobal(global) {
    const globalInt = parseInt(global); // Convertir la nota global a un entero
    return typeof globalInt === 'number' && Number.isInteger(globalInt) && globalInt >= 0 && globalInt <= 500;
}

router.get("/Notas/Todas",async (req,res)=>{
  try{
    const NewNotas =await Notas.findAll() ;
    console.log('Cursos  encontrados:', NewNotas); 
        res.status(200).json({
            status: 200,
            data: NewNotas,
        });
    } catch (error) {
        console.error('Error al obtener las Notas:', error);
        res.status(500).json({
            status: 500,
            message: 'Error interno del servidor',
        });
  }
});

router.delete("/Notas/BorrarPorSimulacro/:idSimulacro", async (req, res) => {
    const { idSimulacro } = req.params; // Obtener el ID del simulacro de los parámetros de la URL

    // Verificar si el ID proporcionado es válido
    if (!idSimulacro) {
        return res.status(400).json({ error: "ID de simulacro no válido" });
    }

    try {
        // Eliminar todas las notas asociadas al ID de simulacro proporcionado
        const notasEliminadas = await Notas.destroy({
            where: { Id_Simulacro: idSimulacro }
        });

        // Verificar si se eliminaron notas y devolver una respuesta apropiada
        if (notasEliminadas > 0) {
            return res.json({
                success: true,
                message: `Se han eliminado ${notasEliminadas} notas asociadas al simulacro con ID ${idSimulacro}`
            });
        } else {
            return res.status(404).json({
                success: false,
                message: `No se encontraron notas asociadas al simulacro con ID ${idSimulacro}`
            });
        }
    } catch (error) {
        console.error("Error al eliminar las notas:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});


router.get("/Notas/:Id_Simulacro", async (req, res) => {
    const { Id_Simulacro } = req.params;
    try {
        // Buscar todas las notas que correspondan al ID del simulacro proporcionado
        const notas = await Notas.findAll({
            where: {
                Id_Simulacro
            }
        });
        
        if (notas.length === 0) {
            // Si no se encuentran notas para el ID del simulacro, retornar un mensaje de not found
            res.status(404).json({
                status: 404,
                message: 'No se encontraron notas para el ID de simulacro proporcionado.'
            });
            return;
        }

        // Extraer solo las notas relevantes de cada objeto de notas
        const notasRelevantes = notas.map(nota => ({
            Nota_LecturaCritica: nota.Nota_LecturaCritica,
            Nota_Matematicas: nota.Nota_Matematicas,
            Nota_Sociales: nota.Nota_Sociales,
            Nota_Naturales: nota.Nota_Naturales,
            Nota_Ingles: nota.Nota_Ingles,
            Global: nota.Global
        }));

        // Si se encuentran notas, retornarlas en la respuesta
        res.status(200).json({
            status: 200,
            data: notasRelevantes
        });
    } catch (error) {
        // Manejo de errores
        console.error('Error al obtener las notas:', error);
        res.status(500).json({
            status: 500,
            message: 'Error interno del servidor'
        });
    }
});





module.exports = router;