const Comment = require("../models/comments")
const vrchat = require("../vrchat")
const User = require("../models/user")
const worldsTemplate = require("../seed");


module.exports={
    create,
    show,
    delete:deleteFavorite
}

async function create(req,res){
    let world = await vrchat.WorldsApi.getWorld(req.params.id) 
    let user = await User.findById(req.user.id)
    user.favorites.push(world.data)
    await user.save()
    
    res.redirect(`/${req.params.id}`)
}

async function show(req,res){
    let user = await User.findById(req.user.id)
    let allWorlds = user.favorites 
    

        res.render("VrcCompanion/favorites",{
        user: req.user,
        name: req.query.name,
        allWorlds
    })

}

async function deleteFavorite(req,res){
    console.log("reached delete")
    res.redirect(`/favorites/user/${req.user.id}`)
}