//Requires
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const path = require('path');

//Import Helmet to secure HTTP headers
const helmet = require("helmet");

//Import Dotenv to use environnement variables
const dotenv = require('dotenv');
dotenv.config();

//Import Express Rate Limit to limit  repeated requests to the APPI (limits force-brute attacks)
const rateLimiter = require("express-rate-limit");

//Import the routers into the app
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauce');


//Connect to MongooDB
mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//Use Helmet
app.use(helmet({
  crossOriginResourcePolicy: false, //Allow images to load 
  })
);

//Parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());

//Set headers CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


//Set the limits
const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000, 
	max: 100, // Limit each IP to 100 requests per 15minutes (was set in WindowMS)
    message: "Vous avez dépassé votre limite de requête, merci de patienter.",
});
app.use(limiter);

//Register routers
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;