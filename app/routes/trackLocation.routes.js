module.exports = (app) => {
 
 var router = require("express").Router();
 const trackLocationController = require("../controllers/trackLocation.controller");

  router.post("/saveLocation", trackLocationController.saveLocation);

  router.post("/getLocationByUserId", trackLocationController.getLocationByUserId);



  app.use("/api/trackLocation", router);
};
