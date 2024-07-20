const { getAllActivityCountries } = require("../controllers/activitiesCountriesController");


const getActivityCountries = async (req, res) => {
  try {
    const activityCountries = await getAllActivityCountries();
    res.status(200).json(activityCountries);
  } catch (error) {
    console.error("Error al obtener la tabla ActivityCountry:", error);
    res
      .status(500)
      .json({ error: "Error al obtener la tabla ActivityCountry" });
  }
};

module.exports = {
  getActivityCountries,
};
