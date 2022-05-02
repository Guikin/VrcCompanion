const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    comment:String,
    date:Date,
    worldId:String,
},{timeStamps:true,})

module.exports= mongoose.model("Comment",commentSchema)