const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ratingSchema = new mongoose.Schema({
    rating:Number,
    worldId:String,
    user:String
},{timeStamps:true,})

module.exports= mongoose.model("Rating",ratingSchema)