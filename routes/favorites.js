var express = require('express');
var router = express.Router();
const favoritesCtrl = require("../controllers/favorites")

router.post("/favorites/:id",favoritesCtrl.create)
router.get("/favorites/user/:id",favoritesCtrl.show)
router.delete("/favorites/user/:id",favoritesCtrl.delete)

module.exports=router