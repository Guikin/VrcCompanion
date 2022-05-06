var express = require('express');
var router = express.Router();
const aboutCtrl = require("../controllers/about")

router.get("/about",aboutCtrl.index)

module.exports=router