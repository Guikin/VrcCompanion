const mongoose = require("mongoose")
const Schema = mongoose.Schema
const User = require("../models/user")

const commentSchema = new mongoose.Schema({
    comment:String,
    date:Date,
    worldId:String,
    userName:String,
    userId:String
},{timeStamps:true,})

module.exports= mongoose.model("Comment",commentSchema)