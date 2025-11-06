const db = require("../models");
const Appointments = db.appointments;
const mongoose = require("mongoose");

//  create a new appointments
exports.create = async (req, res) => {
  // validation
  if (!req?.body?.projectId || !req?.body?.surveyId || !req?.body?.status) {
    res
      .status(400)
      .send({ message: "projectId or surveyId or status missing" });
    return false;
  }
  const surveyData = {
    projectId: req?.body?.projectId,
    surveyId: req?.body?.surveyId,
    status: req?.body?.status,
  };
  const surveyExist = await Survey.findOne({
    projectId: req?.body?.projectId,
    surveyId: req?.body?.surveyId,
  });

  if (surveyExist) {
    res.status(409).send({
      message: "appointments alreay exist",
    });
    return;
  }
  var survey = new Appointments(surveyData);
  survey
    .save()
    .then(async (data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Retrieve all appointments from the database.
exports.getAllAppointments = async (req, res) => {
  try {
    // const { status, projectId } = req.query;
 

    const surveysList = await Appointments.findAll();
    res.status(200).send({
      message: "Appointments found successfully..!",
      data: surveysList,
      counts: counts,
    });
  } catch (error) {
    console.error("Error in get appointments:", error);
    return res.status(500).send({
      message: error.message,
    });
  }
};

