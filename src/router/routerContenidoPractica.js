const express = require("express");
const router = express();
const ModelContentPractice = require("../app/models/modeloContenidoPractica")
const QuestionBankModel = require("../app/models/modeloBancoPreguntas");
const ModeloEstudiantil= require("../app/models/modeloEstudiante")
const ModeloLogPracticas=require('../app/models/modeloLogPracticas')
const ModelPractice = require("../app/models/modeloPractica");


router.post("/ContentPractice/Register", async (req, res) => {
 try{
    const{ IdPractica,Preguntas}=req.body;
    const Practices = await ModelPractice.findByPk(IdPractica);

    const name= Practices.nombre;
    
    let questionsArray = [];

    // Consultar cada pregunta usando los _id proporcionados
    for (const questionId of Preguntas) {
      const question = await QuestionBankModel.findById(questionId);
      if (question) {
        questionsArray.push(question);
      }
    }
    const NewContentPractice = new ModelContentPractice({
        IdPractica,
        Nombre:name,
        Preguntas:questionsArray
    });
    const SavedContentPractice = await NewContentPractice.save();
    res.status(201).json(SavedContentPractice);
    console.log("ContentPractice created");


 }catch(error){
        console.error("Error creating content practice:", error);
        res.status(500).json({error: "Internal server error"});
 }

})

router.get("/ContentPractice/GetAll", async (req, res) => {
    try{
        const ContentPractice = await ModelContentPractice.find();
        res.status(200).json(ContentPractice);
        console.log("ContentPractice found");
    }catch(error){
        console.error("Error finding content practice:", error);
        res.status(500).json({error: "Internal server error"});
    }
});

router.get("/ContentPractice/GetByPracticeId/:Id", async (req, res) => {
    try{
        const {Id} = req.params;
        const ContentPractice = await ModelContentPractice.find({IdPractica: Id});
        res.status(200).json({
            ContentPractice,
            message: "ContentPractice found"
        });
    }catch(error){
        console.error("Error finding content practice:", error);
        res.status(500).json({error: "Internal server error"});
    }
})

router.delete("/ContentPractice/:_Id", async (req, res) => {
    try {
        const { _Id } = req.params;
        
        // Verificar si el ID proporcionado es válido
        if (!_Id) {
            return res.status(400).json({ error: "El ID es requerido" });
        }

        // Intentar eliminar el documento
        const result = await ModelContentPractice.findByIdAndDelete(_Id);

        // Verificar si se encontró y eliminó el documento
        if (!result) {
            return res.status(404).json({ error: "ContentPractice no encontrado" });
        }

        res.status(200).json({ message: "ContentPractice eliminado" });
    } catch (error) {
        console.error("Error eliminando ContentPractice:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

router.post("/ContentPractice/Evaluate", async (req, res) => {
    try {
        const { IdPractica, Respuestas,CedulaAlumno } = req.body;

        // Buscar el contenido de práctica correspondiente en la base de datos
        const ContentPractice = await ModelContentPractice.findOne({ IdPractica });

        if (!ContentPractice) {
            return res.status(404).json({ error: "Práctica no encontrada" });
        }
        const Estudiante = await ModeloEstudiantil.findOne({
            where: { Documento: CedulaAlumno }, 
            attributes: ['Tipo_documento', 'Documento', 'Nombre','Apellido'] 
            
        });

        if (!Estudiante) {
            return res.status(404).json({ error: 'Estudiante not found' });
        }
        
        // Inicializar contadores
        let correctAnswers = 0;
        let wrongAnswers = 0;
        let totalQuestions = ContentPractice.Preguntas.length;
        // Inicializar array para resultados
        let results = [];
        // Iterar sobre cada pregunta del contenido de práctica y comparar las respuestas
        for (let i = 0; i < ContentPractice.Preguntas.length; i++) {
            const correctAnswer = ContentPractice.Preguntas[i].Answer;
            const userAnswer = Respuestas[i];
            // Comparar la respuesta del usuario con la respuesta correcta de la pregunta
            if (userAnswer === correctAnswer) {
                correctAnswers++;
                results.push({
                    Pregunta: ContentPractice.Preguntas[i].Question,
                    RespuestaCorrecta: correctAnswer,
                    RespuestaUsuario: userAnswer,
                    Correcta: true
                });
            } else {
                wrongAnswers++;
                results.push({
                    Pregunta: ContentPractice.Preguntas[i].Question,
                    RespuestaCorrecta: correctAnswer,
                    RespuestaUsuario: userAnswer,
                    Correcta: false
                });
            }
        }
        const score = (correctAnswers / totalQuestions) * 100;

        const newLogPractica = new ModeloLogPracticas({
            IdPractica,
            Alumno: {
                Tipo_documento: Estudiante.Tipo_documento,
                Documento: Estudiante.Documento,
                Nombre: Estudiante.Nombre,
                Apellido: Estudiante.Apellido
            },
            Nota: score,
            Fecha: new Date()
        });
        await newLogPractica.save();
        res.status(200).json({
            Estudiante,
            correctAnswers,
            wrongAnswers,
            results,
            score
        });
    } catch (error) {
        console.error("Error evaluating content practice:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/ContentPractice/GetLogPractices", async (req, res) => {
    try {
        const logPractices = await ModeloLogPracticas.find();
        res.status(200).json(logPractices);
    } catch (error) {
        console.error("Error getting log practices:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/ContentPractice/GetLogPractices/:IdPractica",async(req,res) =>{
    try{
        const {IdPractica} = req.params;
        const logPractices = await ModeloLogPracticas.find({IdPractica});
        res.status(200).json(logPractices);
    }catch(error){
        console.error("Error getting log practices:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})


router.get('/ContentPractice/GetLogPractices/student/:Cedula',async(req,res)=>{
    try{
        const {Cedula} = req.params;
        const cedulaNumber = parseInt(Cedula, 10);
        const logPractices = await ModeloLogPracticas.find({'Alumno.Documento':cedulaNumber});

        if (!logPractices.length) {
            return res.status(404).json({ message: "No se encontraron prácticas para este estudiante" });
        }
        
        res.status(200).json(logPractices);
    }catch(error){
        console.error("Error getting log practices:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})


module.exports = router;
