var express = require('express');
var router = express.Router();
const commentCtrl = require("../controllers/comments")



router.post("/:id/comments",commentCtrl.create)
router.delete("/:id/comments",commentCtrl.delete)
router.put("/:id/comments",commentCtrl.update)


module.exports = router;