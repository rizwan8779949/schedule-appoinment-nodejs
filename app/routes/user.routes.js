module.exports = app => {
  const userController = require("../controllers/user.controller.js");
 var router = require("express").Router();

  // Create a new user
  // router.post("/create", userController.create);

  //  login user
  router.post("/login", userController.login);

 


  app.use("/api/user", router);
};
