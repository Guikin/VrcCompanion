var express = require('express');
var router = express.Router();
const passport = require('passport');
const allWorldsCtrl = require("../controllers/allWorlds")

router.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}
))

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/VrcCompanion',
    failureRedirect : '/VrcCompanion'
  }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/VrcCompanion');
});

/* GET users listing. */
router.get('/',allWorldsCtrl.index);

module.exports = router;
