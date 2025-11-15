const db = require("../models");
const TrackLocation = db.trackLocation;
const mongoose = require("mongoose");

// save a new location
exports.saveLocation = async (req, res) => {
  try {
    const { userId, lat, long } = req.body;

    // Validation
    if (!userId || !Number(lat) || !Number(long) ) {
      return res.status(400).send({ message: "Required fields are missing" });
    }

    const saveLocation = new TrackLocation({
      userId,
      lat,
      long
    });

    const savedLocation = await saveLocation.save();

    res.status(201).json({
      message: "location saved successfully",
      data: savedLocation,
    });
  } catch (err) {
    console.error("Error save location:", err);
    res.status(500).send({ message: err.message });
  }
};


/// Retrieve locations, optionally filtered by userId
exports.getLocationByUserId = async (req, res) => {
  try {
    const { userId } = req.body; // or req.params if preferred

    // Build dynamic query
    const query = {};
    if (userId) {
      query.userId = userId;
    }

    const userByLocationList = await TrackLocation.find(query).lean();

    res.status(200).send({
      message: "Locations found successfully",
      data: userByLocationList,
    });
  } catch (error) {
    console.error("Error in get userId by location:", error);
    res.status(500).send({ message: error.message });
  }
};
