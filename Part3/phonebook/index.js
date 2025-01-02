const express = require("express")
const morgan = require("morgan")
const app = express()

app.use(express.json())

morgan.token('body', (request) => {
    return JSON.stringify(request.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<p>Hello World</p>')
})

app.get('/api/persons', (request,response) => {
    response.json(persons)
})

const processingTime = new Date()
const totalPeople = persons.length

app.get('/info', (request, response) => {
response.send(`<p>Phonebook has info for ${totalPeople} people <br/> ${processingTime}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find((note) => note.id === id)
    response.json(person)
})

const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(person => Number(person.id))) : 0
    return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.number || !body.name){
        return response.status(404).json({
            error: "Name or Number cannot be empty"
        })
    }

    const nameExists = persons.find((person) => person.name === body.name)

    if(nameExists){
        return response.status(400).json({
            error: "name must be unique"
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons.push(person)
    response.status(201).json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter((person) => person.id !== id)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})