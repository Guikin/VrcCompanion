var express = require('express');
var router = express.Router();
const passport = require('passport');
const routerCtrl = require("../controllers/ratings")


router.post("/:id/rating",routerCtrl.create)


module.exports=router