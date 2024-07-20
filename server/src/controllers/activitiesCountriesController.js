
const { ActivityCountry } = require('../db');

const getAllActivityCountries = async () => {
  try {
    const activityCountries = await ActivityCountry.findAll();
    return activityCountries;
  } catch (error) {
    console.error('Error al obtener la tabla ActivityCountry desde la base de datos:', error);
    throw new Error('No se pudo obtener la tabla ActivityCountry desde la base de datos');
  }
};

module.exports = {
  getAllActivityCountries,
};