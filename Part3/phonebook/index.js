require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const Person = require("./models/person");

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

morgan.token("body", (request) => {
  return JSON.stringify(request.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<p>Hello World</p>");
});

app.get("/api/persons", (request, response) => {
  console.log(Person);
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

const processingTime = new Date();
const totalPeople = persons.length;

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${totalPeople} people <br/> ${processingTime}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error))
});

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.number || !body.name) {
    return response.status(404).json({
      error: "Name or Number cannot be empty",
    });
  }

  Person.findOne({ name: body.name }).then((nameExists) => {
    if (nameExists) {
      return response.status(400).json({
        error: "Name must be unique",
      });
    }

    const person = new Person({
      name: body.name,
      number: body.number,
    });

    person.save().then((newPerson) => {
      response.status(201).json(newPerson);
    });
  });
});

app.delete("/api/persons/:id", (request, response) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
});

app.put("/api/persons/:id", (request, response) => {
    const body = request.body
    const person = {
        name: body.name,
        number: body.number,
      };

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

  app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
    next(error)
  }
  app.use(errorHandler)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
