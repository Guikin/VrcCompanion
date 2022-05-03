require("dotenv").config();
const vrchat = require("../vrchat")
const User = require("../models/user")
const Comment = require("../models/comments")

const worldsTemplate = require("../seed");
const comments = require("../models/comments");


module.exports={
    index,
    show
}



async function index(req,res,){
    let AllWorlds = await vrchat.WorldsApi.searchWorlds("false","magic","friends","", 50,"ascending",0,"GuiGui")
    let worlds = AllWorlds.data   


    // worldsTemplate.worlds.forEach(world => {
    //    let date = world.publicationDate
    //    const newDate = date.substring(0, Math.min(date.length, 10));
    //    world.publicationDate = newDate
    // })

    worlds.forEach(world => {
        let date = world.publicationDate
        const newDate = date.substring(0, Math.min(date.length, 10));
        world.publicationDate = newDate
     })

    res.render("VrcCompanion/index",{
        user: req.user,
        name: req.query.name,
        worlds: worlds
    })
}

async function show(req,res){
    let world = await vrchat.WorldsApi.getWorld(req.params.id)
    console.log(world.data)

    let worldComment = await Comment.find({worldId:req.params.id})
    worldComment.reverse()

    // let world= worldsTemplate.justB
    res.render("VrcCompanion/show",{
        user: req.user,
        name: req.query.name,
        world: world.data,//world
        comments:worldComment
    })
}



