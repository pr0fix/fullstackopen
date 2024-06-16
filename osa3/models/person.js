const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB", error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Minimun length for a name is 3 characters"],
    required: [true, "Name is required!"]
  },
  number: {
    type: String,
    minLength: [8,"Minimum length for number is 8 numbers!"],
    required: [true, "Phone number is required!"],
    validate: {
      validator: function(v) {
        return /^(\d{2,3})-(\d{5,})$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
}, { versionKey: false })

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})





module.exports = mongoose.model("Person", personSchema)