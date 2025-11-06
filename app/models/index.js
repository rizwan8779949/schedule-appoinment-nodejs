const dbConfig = require("../config/project.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.databaseUrl;
db.user = require("./user.model.js")(mongoose);
db.appointments = require("./appointments.model.js")(mongoose);

module.exports = db;
