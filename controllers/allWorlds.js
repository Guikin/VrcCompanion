require("dotenv").config();
// const vrchat = require("../vrchat")
const User = require("../models/user")



module.exports={
    index
}



async function index(req,res,){
    // let AllWorlds = await vrchat.WorldsApi.searchWorlds("false","popularity","friends","", 12)
    // let worlds = AllWorlds.data   

    
    res.render("VrcCompanion/index",{
        user: req.user,
        name: req.query.name,
    })
}





