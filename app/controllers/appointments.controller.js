const db = require("../models");
const Appointments = db.appointments;
const mongoose = require("mongoose");

// Create a new appointment
exports.create = async (req, res) => {
  try {
    const { patientName, patientContact, appointmentDate, disease } = req.body;

    // Validation
    if (!patientName || !patientContact || !appointmentDate || !disease) {
      return res.status(400).send({ message: "Required fields are missing" });
    }

    // Check if appointment already exists for same date/contact
    const appointmentExist = await Appointments.findOne({
      patientName,
      patientContact,
      appointmentDate,
    });

    if (appointmentExist) {
      return res
        .status(409)
        .send({ message: "Appointment already exists at this date" });
    }

    let appointmentId;
    let isUnique = false;

    while (!isUnique) {
      appointmentId = 'APN'+Math.floor(100000 + Math.random() * 900000);
      // Check if it already exists
      const existingId = await Appointments.findOne({ appointmentId });
      if (!existingId) isUnique = true;
    }

    const newAppointment = new Appointments({
      appointmentId,
      patientName,
      patientContact,
      appointmentDate,
      disease,
    });

    const savedAppointment = await newAppointment.save();

    res.status(201).json({
      message: "Appointment saved successfully",
      data: savedAppointment,
    });
  } catch (err) {
    console.error("Error creating appointment:", err);
    res.status(500).send({ message: err.message });
  }
};


// Retrieve all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointmentsList = await Appointments.find();
    const counts = appointmentsList.length;

    res.status(200).send({
      message: "Appointments found successfully",
      data: appointmentsList,
      counts,
    });
  } catch (error) {
    console.error("Error in get appointments:", error);
    res.status(500).send({ message: error.message });
  }
};
