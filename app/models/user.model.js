module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password:{
      type: String,
      required: true,
      trim: true,
    },
    //  userType:{
    //   type: String,
    //   required: true,
    //   trim: true,
    //   enum: ["User","Admin"],
    //   default: "User",
    // },
  });

  const user = mongoose.model("user", schema);
  return user;
};
