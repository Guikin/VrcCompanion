var express = require('express');
var router = express.Router();
const allWorldsCtrl = require("../controllers/allWorlds")

/* GET users listing. */
router.get('/',allWorldsCtrl.index);

module.exports = router;
