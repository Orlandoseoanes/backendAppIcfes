const router =require("express").Router()
const { Router } = require("express");
const xlsx = require("xlsx");
const Notas =require("../app/models/modeloNotas");
const multer = require("multer");


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
    return typeof global === 'number' && Number.isInteger(global) && global >= 0 && global <= 500;
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
})

module.exports = router;