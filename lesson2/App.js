const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const {engine} = require("express-handlebars");

const app = express();

// app.listen(5200,() => {
//     console.log('Server is started on port 5200');
// })

// const user = {name: 'Vanya', age: 15};
//
// app.get('/start',(req, res) => {
//     res.send(user);
// })


// --------------- node templates
// --------------- express-handlebars

// --------------- node settings

app.use(express.json()); // - научить node работать с json
app.use(express.urlencoded({extended: true}));

const users = [
    {name: 'Nastya', age: 15},
    {name: 'Nastya', age: 15}
]

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/users', (req, res) => {
    res.render('users', {users});
})

app.get('/users/:userId', (req, res) => {
    const {userId} = req.params;
    if (users[userId]) {
        return res.json(users[userId]);
    }
    res.render('notFound',{text: 'User not found'});
})

app.post('/login', (req, res) => {
    // console.log(req.body);
    users.push(req.body);
    res.redirect('/users');
})

app.use((req, res) => {
    res.render('notFound', {text: 'Page not found'});
})

app.listen(5200,() => {
    console.log('Server is started on port 5200');
})