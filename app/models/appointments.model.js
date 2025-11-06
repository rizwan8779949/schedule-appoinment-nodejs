module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    appointmentID: {
      type: String,
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    patientEmail: {
      type: String,
    },
    patientContact: {
      type: String,
      required: true,
    },
    doctorName: {
      type: String,
    },
    prescription: {
      type: String,
    },
    disease: {
      type: String,
      require: true,
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
    status: {
      type: String,
      enum: ["Pending", "Scheduled", "Completed", "Cancelled"],
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
