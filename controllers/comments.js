const Comment = require("../models/comments")
const vrchat = require("../vrchat")
const User = require("../models/user")
const worldsTemplate = require("../seed");

module.exports={
    create,
    update,
    delete:deleteComment
}


async function create(req,res){
    req.body.worldId = req.params.id
    req.body.date = new Date()
    req.body.userName = req.user.name
    req.body.userId= req.user.id
    const saveComment = await new Comment(req.body)
    await saveComment.save()
    let newComment = await Comment.find({})
    
    res.redirect(`/${req.params.id}`)
}

console.log("good")
async function deleteComment(req,res){
    let comment =  await Comment.findByIdAndDelete(req.params.id)
    res.redirect(`/${comment.worldId}`)
}

async function update(req,res){
    let comment =  await Comment.findByIdAndUpdate(req.params.id,req.body)
    res.redirect(`/${comment.worldId}`)
}
