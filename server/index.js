require('dotenv').config();
const express = require('express'),
    session = require('express-session'),
    massive = require('massive'),
    ctrl = require('./controllers/controller');

const app = express(),
    { SERVER_PORT, MASSIVE_CONNECTION, SESSION_SECRET } = process.env;

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}))

massive(MASSIVE_CONNECTION)
.then(db => {
    app.set('db', db);
    console.log('db connected')
    app.listen( SERVER_PORT, () => console.log(`Port ${SERVER_PORT} is alive!`))
})

app.post('/auth/register', ctrl.register);
app.post('/auth/login', ctrl.login);
app.post('/auth/logout', ctrl.logout);

app.get('/api/current', ctrl.getUser);