const db = require("../models");
const Appointments = db.appointments;
const mongoose = require("mongoose");

// Create a new appointment
exports.create = async (req, res) => {
  try {
    // validation
    const {
      patientName,
      patientEmail,
      appointmentDate,
      appointmentTime,
      reason,
    } = req.body;
    if (!patientName || !patientEmail || !appointmentDate || !appointmentTime) {
      return res.status(400).send({ message: "Required fields are missing" });
    }

    const appointmentExist = await Appointments.findOne({
      patientName,
      patientEmail,
      appointmentDate,
      appointmentTime,
    });

    if (appointmentExist) {
      return res
        .status(409)
        .send({ message: "Appointment already exists at this time" });
    }

    const newAppointment = new Appointments({
      patientName,
      patientEmail,
      doctorName,
      doctorId,
      appointmentDate,
      appointmentTime,
      reason,
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).send(savedAppointment);
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
