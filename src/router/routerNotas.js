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
          res.json({
            success: false,
            message: "Error al subir el archivo. Intente de nuevo.",
          });
        }
  });

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