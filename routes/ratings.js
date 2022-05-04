var express = require('express');
var router = express.Router();
const passport = require('passport');
const routerCtrl = require("../controllers/ratings")


router.post("/:id/rating",routerCtrl.create)
router.delete("/:id/rating",routerCtrl.delete)
router.put("/:id/rating",routerCtrl.update)


module.exports=router