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
    const appointmentsList = await Appointments.find().populate("doctorId"); ;
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


// Retrieve appointment by ID
exports.getAppointmentByID = async (req, res) => {
  try {
    const { appointmentId } = req.query;

    if (!appointmentId) {
      return res.status(400).json({ message: "Appointment ID is required" });
    }

    const appointment = await Appointments.findOne({ appointmentId })
      .populate("doctorId"); // populate selected doctor fields

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      message: "Appointment found successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Error in getAppointmentByID:", error);
    res.status(500).json({ message: error.message });
  }
};



// Update existing appointment details
exports.scheduleAppointment = async (req, res) => {
  try {
    const { appointmentId, patientContact, appointmentDepartment, doctorId } = req.body;

    // Validation
    if (!appointmentId || !patientContact) {
      return res.status(400).json({ message: "appointmentId and patientContact are required" });
    }

    // Find the appointment
    const appointment = await Appointments.findOne({ appointmentId, patientContact });

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Update fields
    appointment.appointmentDepartment = appointmentDepartment || appointment.appointmentDepartment;
    appointment.doctorId = doctorId || appointment.doctorId;
    appointment.status = "Scheduled";

    const updatedAppointment = await appointment.save();

    res.status(200).json({
      message: "Appointment scheduled successfully",
      data: updatedAppointment,
    });
  } catch (err) {
    console.error("Error updating appointment:", err);
    res.status(500).json({ message: err.message });
  }
};

