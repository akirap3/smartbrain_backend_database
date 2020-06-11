const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'ssssssssss973103',
    database : 'smart_brain'
  }
});

// db.select('*').from('users').then(data => {
// 	console.log(data);
// });

const app = express();

app.use(bodyParser.json());
app.use(cors());

// / --> res = this is working or response all users
app.get('/', (req, res) => {res.send(database.users)
})

// /signin --> POST = success/fail
app.post('/signin', signin.handleSignin(db, bcrypt))

// /register --> POST = user
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

// /profile/:userId --> GET = user
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

// /image --> PUT --> user, increase entries number
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3001, () => {
	console.log('app is running on port 3001');
})










