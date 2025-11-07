module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      appointmentId: {
        type: String,
        required: true,
        unique: true,
      },
      patientName: {
        type: String,
        required: true,
        trim: true,
      },
      patientContact: {
        type: String,
        required: true,
        trim: true,
      },
      prescription: {
        type: String,
        default: "",
      },
      disease: {
        type: String,
        required: true,
        trim: true,
      },
      appointmentDate: {
        type: Date,
        required: true,
      },
      appointmentDepartment: {
        type: String,
      },
      doctorId: {
        type: mongoose.Schema.Types.ObjectId, // should be ObjectId
        ref: "doctor", // capitalize model name reference
        required: false,
      },
      status: {
        type: String,
        enum: ["Pending", "Scheduled", "Completed", "Cancelled"],
        default: "Pending",
      },
    },
    {
      timestamps: true, // automatically manages createdAt and updatedAt
    }
  );

  const appointments = mongoose.model("Appointments", schema);
  return appointments;
};
