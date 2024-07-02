const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return v && v.length >= 3;
        },
        message: "Username must be at least 3 characters long",
      },
    },
    name: String,
    passwordHash: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v && v.length >= 3;
        },
        message: "Password must be at least 3 characters long",
      },
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { versionKey: false }
);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
