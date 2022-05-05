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
    console.log(console.log("this is the user" + user))
    res.redirect(`/${req.params.id}`)
}

async function show(req,res){
    let user = await User.findById(req.user.id)
    let allWorlds = user.favorites 
    console.log(allWorlds)

        res.render("VrcCompanion/favorites",{
        user: req.user,
        name: req.query.name,
        allWorlds
    })

}

async function deleteFavorite(req,res){
    
    res.redirect(`favorites/user/${req.user.id}`)
}