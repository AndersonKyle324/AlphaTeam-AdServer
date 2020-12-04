const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const courses = [
    {id: 1, name: 'CPE307'}
]

app.get('/', (req,res) =>{
    res.send('Hello World!')
})

app.get('/api/courses', (req,res) => {
    res.send(courses)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('The course with the given ID was not found')
    res.send(course)
})

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Listening on port 3000...'))