const Comment = require("../models/comments")
// const vrchat = require("../vrchat")
const User = require("../models/user")
const worldsTemplate = require("../seed");

module.exports={
    create,
    update,
    delete:deleteComment
}

async function show(req,res){

}


async function create(req,res){
    req.body.worldId = req.params.id
    req.body.date = new Date()
    const saveComment = await new Comment(req.body)
    await saveComment.save()
    
    let newComment = await Comment.find({})
    console.log(newComment)
    res.redirect(`/VrcCompanion/${req.params.id}`)
}


async function deleteComment(req,res){
    let comment =  await Comment.findByIdAndDelete(req.params.id)
    res.redirect(`/VrcCompanion/${comment.worldId}`)
}

async function update(req,res){
    let comment =  await Comment.findByIdAndUpdate(req.params.id,req.body)
    res.redirect(`/VrcCompanion/${comment.worldId}`)
}
