const { Router } = require("express");
const router = Router(); // Use this single declaration for router

const ModeloInstitucion = require("../app/models/modeloInstitucional");

// REGISTRO INSTITUCION
router.post("/Instituciones", async (req, res) => {
  const { Nombre_Institucion, Nit_institucion } = req.body;

  // Validación 1: Verificar que Nit_institucion sea numérico y cumpla con los límites
  if (
    isNaN(Nit_institucion) ||
    Nit_institucion < 10000 ||
    Nit_institucion > 99999999
  ) {
    return res
      .status(400)
      .json({
        message:
          "El NIT de la institución debe ser numérico y estar entre 10000 y 99999999",
      });
  }

  // Validación 2: Verificar que Nombre_Institucion sea una cadena de texto y cumpla con los límites
  if (
    typeof Nombre_Institucion !== "string" ||
    Nombre_Institucion.length < 2 ||
    Nombre_Institucion.length > 40
  ) {
    return res
      .status(400)
      .json({
        message:
          "El nombre de la institución debe ser una cadena de texto válida entre 2 y 40 caracteres",
      });
  }

  try {
    // Verificar si ya existe una institución con el mismo NIT
    const existingInstitucion = await ModeloInstitucion.findOne({
      where: { Nit_institucion },
    });
    if (existingInstitucion) {
      return res
        .status(409)
        .json({
          message: "Institución ya existe, por favor ingrese una nueva",
        });
    }

    // Crear nueva institución si pasa todas las validaciones
    const NewInstitucion = await ModeloInstitucion.create({
      Nombre_Institucion,
      Nit_institucion,
    });

    res.status(201).json({
      message: "Institución creada exitosamente",
      Institucion: NewInstitucion,
    });
  } catch (error) {
    console.error(error);
    // Verificar si el error es debido a una violación única en la clave primaria
    if (
      error.name === "SequelizeUniqueConstraintError" &&
      error.fields &&
      "PRIMARY" in error.fields
    ) {
      return res
        .status(409)
        .json({
          message: "Institución ya existe, por favor ingrese una nueva",
        });
    }
    res.status(500).json({
      message: "Error al crear Institución",
      error,
    });
  }
});

//TRAER TODAS LAS INSTITUCIONES

router.get("/Instituciones", async (req, res) => {
  // Corregido el orden de req, res
  try {
    const Instituciones = await ModeloInstitucion.findAll();
    console.log("Instituciones encontradas:", Instituciones); // Agrega esta línea para imprimir las instituciones en la consola
    res.status(200).json({
      status: 200,
      data: Instituciones,
    });
  } catch (error) {
    console.error("Error al obtener las Instituciones:", error);
    res.status(500).json({
      status: 500,
      message: "Error interno del servidor",
    });
  }
});

//TRAER INSTITUCIONES POR NIT
router.get("/instituciones/:Nit", async (req, res) => {
  // Corregido el acceso a los parámetros
  try {
    const { Nit } = req.params; // Acceso al parámetro Nit en lugar de Nit_institucion
    if (!Nit) {
      return res.status(400).json({ error: "Nit is required" });
    }
    const Institucion = await ModeloInstitucion.findOne({
      where: { Nit_institucion: Nit }, // Utilizar Nit para buscar en lugar de Nit_institucion
    });

    if (!Institucion) {
      return res.status(404).json({ error: "Institucion not found" });
    }

    return res.status(200).json(Institucion);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
