require("dotenv").config();
// const vrchat = require("../vrchat")
const User = require("../models/user")
const Comment = require("../models/comments")

const worldsTemplate = require("../seed");
const comments = require("../models/comments");


module.exports={
    index,
    show
}



async function index(req,res,){
    // let AllWorlds = await vrchat.WorldsApi.searchWorlds("false","heat","friends","", 12)
    // let worlds = AllWorlds.data   
    
    res.render("VrcCompanion/index",{
        user: req.user,
        name: req.query.name,
        worlds: worldsTemplate.worlds
    })
}

async function show(req,res){
    // let world = await vrchat.WorldsApi.getWorld(req.params.id)
    // console.log(world.data)

    let worldComment = await Comment.find({worldId:req.params.id})

    let world= worldsTemplate.justB
    res.render("VrcCompanion/show",{
        user: req.user,
        name: req.query.name,
        world: world,
        comments:worldComment
    })
}



