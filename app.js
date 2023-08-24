const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = require('./utils/database');
const { error } = require('console');


const User = require('./model/user');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




sequelize.sync().then(() => {
    console.log('Database and Table is created');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/expense.html');
});

app.post('/user', (req, res) => {
    const {amount, description, category} = req.body;
    User.create({
        amount,
        description,
        category,
    })
    .then((user) => {
        console.log('User is created', user.toJSON());
        console.log(user);
        res.status(201).json(user);
    })
    .catch((err) => {
        console.error('Error catching user', err);
        res.status(500).json({ error: 'Errors catching user' });
    });
});

app.delete('/user/:id', (req, res) =>{
    const userId = req.params.id;
    User.findByPk(userId)
        .then((user) => {
            if(!user){
                return res.status(404).json({ error: 'User not found'});
            }
            return user.destroy();
        })
        .then(() => {
            console.log('User deleted');
            res.status(204).send();
        })
        .catch((error) => {
            console.error('Error deleting user:', error);
            if(!res.headersSent){
                res.status(500).json({error: 'Error deleting user'});
            }
        });
});

app.get('/user', (req, res) => {
    User.findAll()
        .then((users) => {
            console.log('Users retrieved', users);
            res.status(200).json(users);
        })
        .catch((error) => {
            console.error('Error retrieving users:', error);
            res.status(500).json({ error: 'Error retrieving users' });
        })
});

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
})