const { Router } = require("express");
const {
  getCountries,
  getDetailCountries,
} = require("../handlers/countryHandler");
const {
  getActivities,
  createActivityHandler,
} = require("../handlers/activityHandler");
const {
  getActivityCountries,
} = require("../handlers/activitiesCountriesHandler");

const router = Router();

router.get("/countries", getCountries);
router.get("/countries/:id", getDetailCountries);
router.post("/activities/create", createActivityHandler);
router.get("/activities", getActivities);
router.get("/activities-countries", getActivityCountries);

module.exports = router;
