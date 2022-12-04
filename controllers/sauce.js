//Import Sauce Schema
const Sauce = require('../models/Sauce');

//Import File System Node package (to enable interactions with files )
const fs = require('fs');


//Create a new sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId; //On ne fait pas confiance au client, on récupèrera le token
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
    sauce.save()
        .then(() => { res.status(201).json({ message: 'La sauce a bien été créée !' }) })
        .catch((error) => { res.status(400).json({ error: error }) })
};

//Get all existing sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => { res.status(200).json(sauces) })
        .catch((error) => { res.status(400).json({ error: error }) });
};

//Get one sauce with ID
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    })
        .then((sauce) => { res.status(200).json(sauce) })
        .catch((error) => { res.status(404).json({ error: error }) });
};

//Modify a sauce
exports.modifySauce = (req, res, next) => {
    //Check if modification contains an image
    if (req.file) {
        //If there's an image 
        const sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        }

        delete sauceObject._userId;

        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                //Check if user ID of the sauce is the same than the user ID with Auth
                if (sauce.userId != req.auth.userId) {
                    res.status(401).json({ message: 'Vous n\'êtes pas autorisé à réaliser cette action.' });
                } else {
                    //Delete the existing image of the sauce
                    const filename = sauce.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        //Update the sauce
                        Sauce.updateOne(
                            { _id: req.params.id },
                            { ...sauceObject, _id: req.params.id }
                        )
                            .then(() => { res.status(200).json({ message: 'La sauce a bien été mise à jour !' }) })
                            .catch((error) => { res.status(401).json({ error: error }) });
                    });
                };
            })
            .catch((error) => { res.status(400).json({ error }) });

    } else {
        //If there's no image
        const sauceObject = { ...req.body }
        delete sauceObject._userId;

        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                //Check if user ID of the sauce is the same than the user ID with Auth
                if (sauce.userId != req.auth.userId) {
                    res.status(401).json({ message: 'Vous n\'êtes pas autorisé à réaliser cette action.' });
                } else {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        { ...sauceObject, _id: req.params.id }
                    )
                        .then(() => { res.status(200).json({ message: 'La sauce a bien été mise à jour !' }) })
                        .catch((error) => { res.status(401).json({ error: error }) });
                };
            })
    }
};


//Delete a sauce
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message: 'Vous n\'êtes pas autorisé à réaliser cette action.' });
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'La sauce a été supprimée !' }) })
                        .catch((error) => { res.status(401).json({ error }) });
                })
            }
        })
        .catch((error) => { res.status(500).json({ error: error }) });
};


//Like or dislike a sauce
exports.likeDislikeSauce = (req, res, next) => {

    const vote = req.body.like;

    //Case 1 : The user likes the sauce
    if (vote === 1) {
        //The sauce object will be updated in the database using MongoDB operators
        //Likes will gain +1 and the user ID will be pushed in the usersLiked array
        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.auth.userId } })
            .then(() => { res.status(200).json({ message: 'La sauce a reçu un like supplémentaire !' }) })
            .catch((error) => { res.status(400).json({ error }) });


        //Case 2 : The user dislikes the sauce
        //Dislikes will gain +1 and the user ID will be pushed in the usersDisliked array
    } else if (vote === -1) {
        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.auth.userId } })
            .then(() => { res.status(200).json({ message: 'La sauce a reçu un dislike supplémentaire !' }) })
            .catch((error) => { res.status(400).json({ error }) });


        //Case 3 : The user cancels his/her vote
    } else {
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {

                //Check if the userID is in the usersLiked array
                //Likes will loose 1 and the user ID will be pulled off the usersLiked array
                if (sauce.usersLiked.includes(req.auth.userId)) {
                    Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.auth.userId } })
                        .then(() => { res.status(200).json({ message: 'L\'utilisateur a annulé son like !' }) })
                        .catch((error) => { res.status(400).json({ error }) });

                    //Check if the userID is in the userDisliked array
                    //Dislikes will loose 1 and the user ID will be pulled off the usersDisliked array
                } else if (sauce.usersDisliked.includes(req.auth.userId)) {
                    Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.auth.userId } })
                        .then(() => { res.status(200).json({ message: 'L\'utilisateur a annulé son dislike !' }) })
                        .catch((error) => { res.status(400).json({ error }) });
                }
            })

            .catch((error) => { res.status(401).json({ error }) });
    }
};