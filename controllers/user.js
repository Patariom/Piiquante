//Import bcrypt to hash passwords
const bcrypt = require('bcrypt');

//Import jsonwebtoken to get Auth Token
const jwt = require('jsonwebtoken');

//Import User Schema
const User = require('../models/User');



//Register an account
exports.signup = (req, res, next) => {

    //Hash the chosen password from the form
    bcrypt.hash(req.body.password, 10)

        .then(hash => {
            //Create a new user using the User Schema
            const user = new User ({
                email: req.body.email,
                password: hash
            });

            //Save the User in the database
            user.save()
                .then(() => res.status(201).json({ message: 'L\'utlisateur a bien été créé' }))
                .catch(error => res.status(400).json({ error }));
        })

        .catch(error => res.status(500).json({ error }));
};

//Login into account
exports.login = (req, res, next) => {

    //Find user in database with the given email
    User.findOne({email : req.body.email})

        .then(user => {

            //Check if there's an existing user
            if(!user) {
                //Don't mention that user doesn't exist for security issue
                res.status(401).json({message: 'Le combo identifiant/mot de passe est incorrect !'});
            
            } else {
                //Check if the hash in form match the hash in BDD
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if(!valid) {
                            //Don't mention that password is incorrect for security issue
                            res.status(401).json({message: 'Le combo identifiant/mot de passe est incorrect !'});
                        } else {
                            res.status(200).json ({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId : user._id },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                )
                            })
                        }
                    })
                    .catch(error => res.status(500).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }));
};

