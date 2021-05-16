const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded(({extended:false})));

const db = require('./queries');

app.get('/', (req, res) => {
    res.json("hello");
})

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUsersById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

app.listen(port, (err) => {
    if (err) {
        console.log('err', err.message)
    } else {
        console.log(`App running on PORT: ${port}`)
    }
})