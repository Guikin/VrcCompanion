const mongoose = require("mongoose")

const ratingSchema = new mongoose.Schema({
    rating:Number,
    worldId:String,
},{timeStamps:true,})

module.exports= mongoose.model("Rating",ratingSchema)