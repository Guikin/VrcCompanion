const mongoose = require("mongoose")

const favoriteSchema = new mongoose.Schema({
    id:String,
    thumbnailImageUrl:String,
    authorName:String,
    name:String
})

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    googleId:String,
    favorites:[favoriteSchema]
})

module.exports = mongoose.model("User",userSchema)