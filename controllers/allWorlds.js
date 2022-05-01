require("dotenv").config();
const vrchat = require("../vrchat")


module.exports={
    index
}



async function index(req,res,){
    let AllWorlds = await vrchat.WorldsApi.searchWorlds("false","popularity","friends","", 12)
    
    let worlds = AllWorlds.data   
    console.log(worlds)
    res.render("VrcCompanion/index",{worlds})
}





