module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId, // should be ObjectId
        ref: "user", 
      },
      lat: {
        type: String,
        required: true,
      },
      long: {
        type: String,
        required: true,
        trim: true,
      },
    },
    {
      timestamps: true, 
    }
  );

  const trackLocation = mongoose.model("trackLocation", schema);
  return trackLocation;
};
