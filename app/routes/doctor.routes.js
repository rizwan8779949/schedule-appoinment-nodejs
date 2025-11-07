module.exports = (app) => {
 
 var router = require("express").Router();
 const doctorsController = require("../controllers/doctors.controller.js");

  router.post("/create", doctorsController.create);

  router.get("/getAlldoctors", doctorsController.getAllDoctors);



  app.use("/api/doctor", router);
};
