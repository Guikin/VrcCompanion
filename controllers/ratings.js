const Comment = require("../models/comments")
// const vrchat = require("../vrchat")
const User = require("../models/user")
const worldsTemplate = require("../seed");
const Rating =require ("../models/ratings")


module.exports={
    create
}

async function create(req,res){
   req.body.worldId = req.params.id 
    const savedRating = await new Rating (req.body)
    await savedRating.save()
    res.redirect(`/${req.params.id}`)
}