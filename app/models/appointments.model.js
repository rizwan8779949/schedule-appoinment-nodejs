module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    patientName: {
      type: String,
      required: true,
    },
    patientEmail: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
    },
    doctorEmail: {
      type: String,
    },
    doctorContact: {
      type: String,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    appointmentTime: {
      type: String, // or you can store as Date if storing full datetime
      required: true,
    },
    reason: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending","Scheduled", "Completed", "Cancelled"],
      default: "Pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  });

  const appointments = mongoose.model("Appointments", schema);
  return appointments;
};
