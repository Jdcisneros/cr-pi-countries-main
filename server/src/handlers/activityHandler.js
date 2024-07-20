const {
  getAllActivities,
  createActivityController,
} = require("../controllers/activityController");

const { sequelize } = require('../db');

const createActivityHandler = async (req, res) => {
  const { name, difficulty, duration, season, countryIds } = req.body;
  console.log("Datos recibidos:", req.body);

  try {
    const activity = await createActivityController({
      name,
      difficulty,
      duration,
      season,
      countryIds,
      sequelize // Asegúrate de que sequelize esté disponible aquí
    });

    console.log("Actividad creada:", activity);
    res.status(200).json(activity);
  } catch (error) {
    console.error("No se pudo crear la actividad", error);
    res.status(400).json({ error: "No se pudo crear la actividad" });
  }
};

const getActivities = async (req, res) => {
  try {
    const activities = await getAllActivities();
    res.status(200).json(activities);
  } catch (error) {
    console.error("No se pudo crear la actividad:", error);
    res.status(400).json({ error: "No se pudo crear la actividad" });
  }
};

module.exports = {
  createActivityHandler,
  getActivities,
};
