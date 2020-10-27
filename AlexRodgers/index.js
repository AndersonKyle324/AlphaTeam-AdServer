const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000

const app = express();

let users = {
    1: {
        id: '1',
        username: 'Alex',
    },
    2: {
        id: '2',
        username: 'Not Alex',
    },
};

let messages = {
    1: {
        id: '1',
        text: 'Hello World',
        userId: '1',
    },
    2: {
        id: '2',
        text: 'By World',
        userId: '2',
    },
};

app.get('/', (req, res) => {
    res.send('hello')
})

app.use('/private', (req, res) => {

})

app.use('/users/:id', (req, res, next) => {
    console.log('executed in /users/:id');
    console.log('Request Type: ' + req.method);
    next()
})

app.get('/users/:id', (req, res) => {
    res.send(users[req.body.id]);
})

app.use('/messages/:id', (req, res, next) => {
    console.log('Request Type:  ' + req.method);
    next()
})

app.get('/messages/:id', (req, res) => {
    res.send(messages[req.body.id]);
})

app.get('/users', (req, res, next) => {
    console.log('executed in /users')
    next()
})

app.all('*', (req, res) => {
    return res.status(404).json({error: 'Unable to find path to request resource'});
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})