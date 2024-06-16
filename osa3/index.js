require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")
const app = express()

app.use(cors())
app.use(express.json())

// create morgan token to show request body on POST-request
morgan.token("body", request => {
  if (request.method === "POST") {
    return JSON.stringify(request.body)
  } else {
    return " "
  }
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))
app.use(express.static("dist"))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if(error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

// get all persons
app.get("/api/persons", (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
    .catch(error => next(error))
})

// get person by id
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if(person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))

})

// delete person
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(() => {
    response.status(204).end()
  })
    .catch(error => next(error))
})

//update person
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body

  const person = {
    id: request.params.id,
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: "query" })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

// add person
app.post("/api/persons", (request, response, next) => {
  const body = request.body

  Person.findOne({ name: body.name })
    .then(existingPerson => {
      if (existingPerson) {
        return response.status(400).json({
          error: "name must be unique"
        })
      }

      const person = new Person({
        name: body.name,
        number: body.number
      })

      person.save()
        .then(savedPerson => {
          response.json(savedPerson)
        }).catch(error => next(error))
    })
})

// show info page
app.get("/info", (request, response, next) => {
  Person.countDocuments().then(count => {
    const timestamp = new Date()
    response.send(`Phonebook has info for ${count} people <br/> ${timestamp}`)
  })
    .catch(error => next(error))
})


app.use(unknownEndpoint)
app.use(errorHandler)

// define and configure server port
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
