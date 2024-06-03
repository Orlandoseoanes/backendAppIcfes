const express = require("express");
const router = express();
const QuestionBankModel = require("../app/models/modeloBancoPreguntas");
const ImagenModel = require("../app/models/modeloImagen");

const multer = require("multer");

// Configuración de multer para guardar los archivos en el directorio temporal
const upload = multer({
  storage: multer.memoryStorage(), // Almacenamiento en memoria para manejar archivos temporales
  limits: {
    fileSize: 5 * 1024 * 1024, // Límite de tamaño del archivo (5MB)
  },
});

router.post("/Question/Register", upload.single("Photo"), async (req, res) => {
  try {
    const {
      id,
      Question,
      Answer,
      OptionA,
      OptionB,
      OptionC,
      OptionD,
      Subject,
    } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (
      !Question ||
      !Answer ||
      !OptionA ||
      !OptionB ||
      !OptionC ||
      !OptionD ||
      !Subject
    ) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios." });
    }

    if (req.file) {
      // Si hay un archivo adjunto
      const file = req.file;
      const nombreArchivo = `question-${Question}-${Date.now()}.jpg`;
      const imagenBase64 = file.buffer.toString("base64");

      const NewImagen = new ImagenModel({
        NombreImagen: nombreArchivo,
        Imagen: imagenBase64,
      });
      await NewImagen.save();

      // Guardar la información de la pregunta en la base de datos
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
    } else {
      // Si no hay archivo adjunto, guardar solo la información de la pregunta en la base de datos
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
    console.error("Error creating question:", error);
    res.status(500).json({ error: "Internal server error" });
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
    const { Question, Answer, OptionA, OptionB, OptionC, OptionD } = req.body;
    const question = await QuestionBankModel.findOneAndUpdate(
      { _id },
      { Question, Answer, OptionA, OptionB, OptionC, OptionD },
      { new: true }
    );
    res.status(200).json(question);
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/Question/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const question = await QuestionBankModel.findOneAndDelete({ _id });
    res.status(200).json({
      message: "pregunta borrada",
    });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/Questions/Image/:Nombre", async (req, res) => {
  try {
    const nombreArchivo = req.params.Nombre;
    const imagen = await ImagenModel.findOne({ NombreImagen: nombreArchivo });

    if (!imagen) {
      return res.status(404).json({ error: "Imagen no encontrada" });
    }

    const imagenBuffer = Buffer.from(imagen.Imagen, "base64");

    // Envía la imagen decodificada como respuesta
    res.writeHead(200, {
      "Content-Type": "image/jpeg",
      "Content-Length": imagenBuffer.length,
    });
    res.end(imagenBuffer);
  } catch (error) {
    console.error("Error al obtener la imagen:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
