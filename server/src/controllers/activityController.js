const { Activity, Country } = require("../db");


const createActivityController = async ({
  name,
  difficulty,
  duration,
  season,
  countryIds,
  sequelize
}) => {
  console.log("Este es el input:", name, difficulty, duration, season, countryIds);

  try {
    const createdActivity = await sequelize.transaction(async (t) => {
      const activity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
      }, { transaction: t });

      if (countryIds && countryIds.length > 0) {
        const countries = await Country.findAll({ where: { id: countryIds } });
        await activity.addCountries(countries, { transaction: t });

        // Obtener los nombres de los países asociados
        const countryNames = countries.map(country => country.name);
        activity.countryNames = countryNames; // Añadir los nombres de los países al objeto activity
      }

      return activity;
    });

    // Devolver la actividad creada incluyendo countryNames
    return {
      id: createdActivity.id,
      name: createdActivity.name,
      difficulty: createdActivity.difficulty,
      duration: createdActivity.duration,
      season: createdActivity.season,
      countryNames: createdActivity.countryNames // Incluir countryNames aquí
    };
  } catch (error) {
    console.error("Error creando actividad en la base de datos:", error);
    throw new Error(`No se pudo crear la actividad en la base de datos: ${error.message}`);
  }
};

const getAllActivities = async () => {
  try {
    const allActivities = await Activity.findAll();
    return allActivities;
  } catch (error) {
    console.error("error al cargar actividades", error);
  }
};

module.exports = {
  createActivityController,
  getAllActivities,
};
