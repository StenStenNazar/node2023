const express = require('express')
const {urlencoded, json} = require("express");

const users = require('./users.json')
const validator = require('./service')
const userWriterJson = require('./service')


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.redirect('http://localhost:5001/users')
})
app.get('/users', (req, res) => {
    res.status(200).json(users)
})

app.post('/users', (req, res) => {

    const {id, name, age} = req.body
    validator.validator(id, name, age)

    const existId = users.some(user => user.id === +id)
    if (existId) {
        throw new Error('id already exists')
    }

    users.push(req.body);
    res.status(201).json({
        message: "User created."
    });

    userWriterJson.userWriterJson(users)
})

app.put('/users/:userId', (req, res) => {
    const {id, name, age} = req.body;
    validator.validator(id, name, age);

    const {userId} = req.params;
    const index = users.findIndex(user => user.id === +userId);
    if (index !== -1) {
        users[index] = req.body;
        res.status(200).json({
            message: 'User updated',
            data: users[index],
        });
        userWriterJson.userWriterJson(users);
    } else {
        res.status(404).json({
            message: 'User not found.',
        });
    }
});

app.delete('/users/:id', (req, res) => {
    const {id} = req.params;

    const existId = users.some(user => user.id === +id)
    if (!existId) {
        throw new Error('id not exist')
    }

    const itemToDelete = users.filter(user => user.id === +id)
    const index = users.indexOf(itemToDelete[0])
    users.splice(index, 1)

    res.status(200).json({
        message: 'User deleted',
    })
    userWriterJson.userWriterJson(users)
})

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT} `)
})
