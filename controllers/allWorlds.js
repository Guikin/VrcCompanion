require("dotenv").config();
const vrchat = require("../vrchat")
const User = require("../models/user")
const Comment = require("../models/comments")
const Rating = require("../models/ratings")

const worldsTemplate = require("../seed");
const comments = require("../models/comments");
const user = require("../models/user");


module.exports={
    index,
    show
}



async function index(req,res,){
    let offset = req.query.offset * 10 || 0
    let trending = false || true 
    let sort = req.query.sort || "popularity"
    let worldName = req.query.worldName || ""
    
    try{

    
    let AllWorlds = await vrchat.WorldsApi.searchWorlds("false",`${sort}`,"friends","",10,"descending",offset,`${worldName}`)
    let worlds = AllWorlds.data   
    
    let limit =  await vrchat.WorldsApi.searchWorlds("false",`${sort}`,"friends","",50,"descending",0,`${worldName}`)
    let limitPage=Math.ceil(((limit.data).length)/10)
    console.log(limitPage)

    

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
        worlds: worlds,
        worldName,
        limitPage
    })
 }catch(err){
     console.log(err)
     res.send(" sad face")
 }
}

async function show(req,res){

    let world = await vrchat.WorldsApi.getWorld(req.params.id)
    

    // let worldRating = await Rating.find({worldId:req.params.id})
    // console.log(worldRating)

    let worldComment = await Comment.find({worldId:req.params.id})
    worldComment.reverse()

    worldComment.forEach(comment=>{
        console.log(comment)
    })
    
    // Rating section
    let worldRating =await Rating.find({worldId:req.params.id})

    //  To calculate the rating of the world
    let allrating =0
     worldRating.forEach(rating =>{
         allrating+=rating.rating    
         })
    let averageRating =Math.round(allrating / worldRating.length)
        
        let ratingNumber = worldRating.length
    
    let visited = await Rating.findOne(user.id)
      

    // let world= worldsTemplate.justB
    res.render("VrcCompanion/show",{
        user: req.user,
        name: req.query.name,
        world: world.data,//world //world.data
        comments:worldComment,
        rating:averageRating,
        ratingNumber,
        visited
    })
}



