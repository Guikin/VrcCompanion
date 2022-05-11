require("dotenv").config();
const vrchat = require("../vrchat")
const User = require("../models/user")
const Comment = require("../models/comments")
const Rating = require("../models/ratings")
const Images = require("../models/images")
const worldsTemplate = require("../seed");
const comments = require("../models/comments");
const user = require("../models/user");
const request = require('request');
const fs = require('fs');


module.exports={
    index,
    show,
    upload
}




function base64_encode(image) {
  // read binary data
  var bitmap = fs.readFileSync(image);
  // convert binary data to base64 encoded string
  return bitmap.toString('base64');
}


function upload(req, res) {
    console.log(req.file)
    let image = base64_encode(req.file.path)

const options = {
    method: 'POST',
    url: 'https://api.imgur.com/3/image',
    headers: {
      Authorization: `Client-ID ${process.env.IMAGURAPI_CLIENT_ID}`,
    },
    formData: {
      image: image,
      type: 'base64'
    },
  }

  request(options, function(err, response) {
    if (err) return console.log(err);
    let body = JSON.parse(response.body)
    
    let link=body.data.link;
        body.imageLink = link

    let image = {}
    image.userId = req.user.id
    image.imageLink = link
    image.userName= req.user.name
    image.worldId = req.params.id
    image.date= new Date()
    // Mongoose query here to save to db
    // body.data.link points to imgur url
    const newImage = new Images(image)

    newImage.save(function(err){
    fs.unlink(req.file.path,function(err){
        if(err) return console.log(err)
        res.redirect(`/${req.params.id}`)
     })
    })
  })
}

async function index(req,res,){
    
    let offset = req.query.offset * 10 || 0
    let trending = false || true 
    let sort = req.query.sort || "popularity"
    let worldName = req.query.worldName || "";
    let lastSort = sort
    let pageNumber=parseInt(req.query.offset)+1

    try{
    let AllWorlds = await vrchat.WorldsApi.searchWorlds("false",`${sort}`,"friends","",10,"descending",offset,`${worldName}`)
    let worlds = AllWorlds.data   
    
    let limit =  await vrchat.WorldsApi.searchWorlds("false",`${sort}`,"friends","",50,"descending",0,`${worldName}`)
    let limitPage=Math.ceil(((limit.data).length)/10)
    

    
    

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
        limitPage,
        lastSort,
        pageNumber
    })
 }catch(err){
     console.log(err)
     
     res.send("sad face")
 }
}

async function show(req,res){

    let world = await vrchat.WorldsApi.getWorld(req.params.id)
    

    // let worldRating = await Rating.find({worldId:req.params.id})
    // console.log(worldRating)

    let worldComment = await Comment.find({worldId:req.params.id})
    worldComment.reverse()

    worldComment.forEach(comment=>{
        
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
    

    let images = await Images.find({WorldId:req.params.id})
    


    // let world= worldsTemplate.justB
    res.render("VrcCompanion/show",{
        user: req.user,
        name: req.query.name,
        world: world.data,//world //world.data
        comments:worldComment,
        rating:averageRating,
        ratingNumber,
        visited,
        images
    })
}


