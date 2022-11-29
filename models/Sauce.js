const mongoose = require("mongoose");


const sauceSchema = mongoose.Schema({
    userId: {type:String, required:true}, //voir si on doit mettre unique ?
    name: {type:String, required:true},
    manufacturer: {type:String, required:true},
    description: {type:String, required:true},
    mainPepper: {type:String, required:true},
    imageUrl: {type:String, required:true},
    heat: {type:Number, required:true},

    //Likes and dislikes system
    likes: {type:Number, required:true},
    dislikes: {type:Number, required:true},
    usersLiked: {type:Array, default: [],  required:true},
    usersDisliked: {type:Array, default: [], required:true},
})


module.exports = mongoose.model("Sauce", sauceSchema);

