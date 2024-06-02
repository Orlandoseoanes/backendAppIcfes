const express = require("express");
const router = express();
const QuestionBankModel = require("../app/models/modeloBancoPreguntas");
const multer = require("multer");
const { storage } = require("../app/firebase"); // Importa el almacenamiento desde tu archivo firebase.js
const sharp = require('sharp'); // Asegúrate de tener Sharp instalado
// Configuración de multer para guardar los archivos en el directorio temporal
const upload = multer({
  storage: multer.memoryStorage(), // Almacenamiento en memoria para manejar archivos temporales
  limits: {
    fileSize: 5 * 1024 * 1024, // Límite de tamaño del archivo (5MB)
  },
});

  router.post('/Question/Register', upload.single('Photo'), async (req, res) => {
    try {
        const { id, Question, Answer, OptionA, OptionB, OptionC, OptionD, Subject } = req.body;

        // Validar que todos los campos requeridos estén presentes
        if (!Question || !Answer || !OptionA || !OptionB || !OptionC || !OptionD || !Subject) {
            return res.status(400).json({ error: "Todos los campos son obligatorios." });
        }


        if (req.file) {
            // Si hay un archivo adjunto
            const file = req.file;
            const nombreArchivo = `question-${Question}-${Date.now()}.jpg`;
            const fileUpload = storage.file(nombreArchivo);
            const blobStream = fileUpload.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                }
            });

            blobStream.on('error', (error) => {
                console.error('Error al cargar el archivo:', error);
                res.status(500).json({ error: 'Error al cargar el archivo' });
            });

            blobStream.on('finish', async () => {
                try {
                    // Finalizada la carga del archivo, se guarda la pregunta en la base de datos
                    const newQuestion = new QuestionBankModel({
                        Question,
                        Answer,
                        OptionA,
                        OptionB,
                        OptionC,
                        OptionD,
                        Photo: nombreArchivo,
                        Subject,
                    });
                    const savedQuestion = await newQuestion.save();

                    res.status(201).json(savedQuestion);
                } catch (error) {
                    console.error('Error al cargar la foto o agregar la pregunta:', error);
                    res.status(500).json({ error: 'Error al cargar la foto o agregar la pregunta' });
                }
            });

            blobStream.end(file.buffer); 
        } else {
            const newQuestion = new QuestionBankModel({
                Question,
                Answer,
                OptionA,
                OptionB,
                OptionC,
                OptionD,
                Subject,
            });
            const savedQuestion = await newQuestion.save();

            res.status(201).json(savedQuestion);
        }
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get("/Questions", async (req, res) => {
  try {
    const questions = await QuestionBankModel.find();
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error getting questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/Questions/:Subject", async (req, res) => {
  try {
    const { Subject } = req.params;
    const questions = await QuestionBankModel.find({ Subject });
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error getting questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/Questions/Individual/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const questions = await QuestionBankModel.find({ _id });
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error getting questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/Question/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { Question, Answer, OptionA, OptionB, OptionC, OptionD, Photo } =
      req.body;
    const question = await QuestionBankModel.findOneAndUpdate(
      { _id },
      { Question, Answer, OptionA, OptionB, OptionC, OptionD, Photo },
      { new: true }
    );
    res.status(200).json(question);
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.delete("/Question/_id", async (req, res) => {
  try {
    const { Subject } = req.params;
    const { id } = req.body;
    const question = await QuestionBankModel.findOneAndDelete({ Subject, id });
    res.status(200).json(question);
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
