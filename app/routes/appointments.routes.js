module.exports = (app) => {
 
 var router = require("express").Router();
 const appointmentsController = require("../controllers/appointments.controller.js");

  router.post("/create", appointmentsController.create);

  router.get("/getAllAppointments", appointmentsController.getAllAppointments);



  app.use("/api/appointments", router);
};
