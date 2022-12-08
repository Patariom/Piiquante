//Requires
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const path = require('path');

//Import Dotenv to use environnement variables
const dotenv = require('dotenv');
dotenv.config();

//Import the routers into the app
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauce');


//Connect to MongooDB
mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());

//Set headers CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


//Register routers
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;