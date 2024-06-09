const router = require("express").Router();
const { where } = require("sequelize");
const ModelPractice = require("../app/models/modeloPractica");

router.post("/Registro/Practica", async (req, res) => {
  const { nombre, Id_institucion } = req.body;
  try {
    const NewPractice = await ModelPractice.create({
      nombre,
      Id_institucion,
    });
    res.status(201).json({
      message: "Nueva Practica creada exitosamente",
      Practica: NewPractice,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error al crear nueva practica",
      error,
    });
  }
});

router.get("/Practices", async (req, res) => {
  try {
    const Practices = await ModelPractice.findAll();
    console.log("Practices founded:", Practices);
    res.status(200).json({
      status: 200,
      data: Practices,
    });
  } catch (error) {
    console.error("Error obtaining the practices:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
});


router.get("/Practices/:id",async(req,res)=>{
  const {id}=req.params;
  try{
    const Practices = await ModelPractice.findByPk(id);
    console.log("Practices founded:", Practices);
    res.status(200).json({
      status: 200,
      data: Practices,
    });

  }catch(error) {
    console.error("Error obtaining the practices:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
})

module.exports = router;
