const Comment = require("../models/comments")
const vrchat = require("../vrchat")
const User = require("../models/user")
const worldsTemplate = require("../seed");
const Rating =require ("../models/ratings")


module.exports={
    create,
    delete:deleteRating,
    update
}

async function create(req,res){
   req.body.worldId = req.params.id 
   req.body.user = req.user.id
    const savedRating = await new Rating (req.body)
    await savedRating.save()
    res.redirect(`/${req.params.id}`,)
}

async function deleteRating(req,res){
    let rating =  await Rating.findOneAndDelete({user:req.user.id})
    res.redirect(`/${rating.worldId}`)
}

async function update(req,res){
    let rating =  await Rating.findOneAndUpdate({user:req.user.id},req.body)
    
    res.redirect(`/${rating.worldId}`)
}