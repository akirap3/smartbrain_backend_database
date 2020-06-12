const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
    	rejectUnauthorized: true
    }
  }
});

// db.select('*').from('users').then(data => {
// 	console.log(data);
// });

const app = express();

app.use(bodyParser.json());
app.use(cors());

// / --> res = this is working or response all users
app.get('/', (req, res) => {res.send('it is working')
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

app.listen(process.env.PORT || 3001, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})










