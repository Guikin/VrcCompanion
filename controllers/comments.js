const Comment = require("../models/comments")

module.exports={
    create,
    show
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
