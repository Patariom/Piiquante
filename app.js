const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Import the routers into the app
const userRoutes = require('./routes/user');

//Connect to Mongoose
mongoose.connect('mongodb+srv://piiquanteadmin:carolina6reaper@piiquante.frqhwfm.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());

//Allow the two apps to work together
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// //Test middlewares
// app.use((req, res, next) => {
//    res.json({ message: 'Votre requête a bien été reçue !' }); 
//    next();
// });


//Register routers
app.use('/api/auth', userRoutes);



module.exports = app;