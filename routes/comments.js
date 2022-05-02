var express = require('express');
var router = express.Router();
const commentCtrl = require("../controllers/comments")



router.post("/:id/comments",commentCtrl.create)


module.exports = router;