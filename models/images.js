const mongoose = require("mongoose")
const Schema = mongoose.Schema

const imageSchema = new Schema({
    userId:String,
    imageLink:String,
    userName:String,
    worldId:String,
    date:Date,    
},{timeStamps:true})

module.exports= mongoose.model("Images",imageSchema)