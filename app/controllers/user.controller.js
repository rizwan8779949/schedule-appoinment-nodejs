const db = require("../models");
const User = db.user;
const mongoose = require("mongoose");
const config=require('../config/project.config')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// //  create a new user
// exports.create = async (req, res) => {
//   // validation
//   if (!req?.body?.username || !req?.body?.password||!req?.body?.name) {
//     res.status(400).send({ message: "username or password or name missing" });
//     return false;
//   } 
//   const userExist = await User.findOne({username:req?.body?.username});
//   if (userExist) {
//     res.status(400).send({
//       message: "User already exist ..!",
//     });
//     return;
//   }
// // Create a User
// const salt = await bcrypt.genSalt(10);
// const userData = {
//   name: req.body.name,
//   username: req.body.username,
//   status: 0,
//   password: await bcrypt.hash(req.body.password, salt),
// };
//   var user = new User(userData);
//   user
//     .save()
//     .then(async (data) => {
//       res.status(200).send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message,
//       });
//     });
// };

exports.login = async (req, res) => {
  if (!req?.body?.username || !req?.body?.password) {
    res.status(400).send({
      message: "username or password can not be empty!",
    });
    return;
  }
  const user = await User.findOne( { username: req.body.username } );
  if (user) {
 
    const password_valid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (password_valid) {
      token = jwt.sign(
        { id: user.id, username: user.username },
        config.tokenScretKey
      );
      const loginData = {
        id: user?._id,
        username: user.username,
        name: user.name,
        status: user.status,
      };
      res.status(200).send({ token: token, user: loginData });
    } else {
      res.status(400).send({ message: "Password Incorrect" });
    }
  } else {
    res.status(404).send({
      message: "User does not exist ..!",
    });
  }
  // Save User in the database
};
