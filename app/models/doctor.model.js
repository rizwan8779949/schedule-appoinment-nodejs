module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      contactNo: {
        type: String,
        required: true,
      },
      department: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      timestamps: true, 
    }
  );

  const doctor = mongoose.model("doctor", schema);
  return doctor;
};
