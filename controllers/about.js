const vrchat = require("../vrchat")
const User = require("../models/user")
const Comment = require("../models/comments")
const Rating = require("../models/ratings")

module.exports={
    index
}

async function index(req,res){
    
    res.render("VrcCompanion/about",{
        user: req.user,
        name: req.query.name,
    })
}