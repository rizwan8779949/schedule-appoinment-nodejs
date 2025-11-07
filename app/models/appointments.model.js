module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    appointmentId: {
      type: String,
      required: true,
    },
    patientName: {
      type: String,
      required: true,
    },
    patientContact: {
      type: String,
      required: true,
    },
    prescription: {
      type: String,
    },
    disease: {
      type: String,
      require: true,
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
