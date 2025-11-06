module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    projectId: {
      type: String,
      required: true,
      trim: true,
    },
    surveyId: {
      type: String,
      required: true,
      trim: true,
    },
    status:{
      type: String,
      required: true,
      trim: true,
    },
  });

  const survey = mongoose.model("survey", schema);
  return survey;
};
