const db = require("../models");
const Doctors = db.doctor;
const mongoose = require("mongoose");

// Create a new doctor
exports.create = async (req, res) => {
  try {
    const { name, contactNo, department } = req.body;

    // Validation
    if (!name || !contactNo || !department ) {
      return res.status(400).send({ message: "Required fields are missing" });
    }

    // Check if doctor already exists for same date/contact
    const doctorExist = await Doctors.findOne({
      name,
      contactNo,
      department,
    });

    if (doctorExist) {
      return res
        .status(409)
        .send({ message: "doctor already exists" });
    }

    

    const newdoctor = new Doctors({
      name,
      contactNo,
      department
    });

    const saveddoctor = await newdoctor.save();

    res.status(201).json({
      message: "doctor create successfully",
      data: saveddoctor,
    });
  } catch (err) {
    console.error("Error creating doctor:", err);
    res.status(500).send({ message: err.message });
  }
};


// Retrieve all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const doctorsList = await Doctors.find();
    const counts = doctorsList.length;

    res.status(200).send({
      message: "Doctors found successfully",
      data: doctorsList,
      counts,
    });
  } catch (error) {
    console.error("Error in get doctors:", error);
    res.status(500).send({ message: error.message });
  }
};
