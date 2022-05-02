var express = require('express');
var router = express.Router();
const passport = require('passport');
const allWorldsCtrl = require("../controllers/allWorlds")


// World Detail Oauth Routing
router.get("/VrcCompanion/auth/google",passport.authenticate("google",{scope:["profile","email"]}
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/VrcCompanion',
    failureRedirect : '/VrcCompanion'
  }
));

router.get('/VrcCompanion/logout', function(req, res){
  req.logout();
  res.redirect('/VrcCompanion');
});



// Homepage Oauth Routing
router.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}
));

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



/* GET Worlds listing. */
router.get('/',allWorldsCtrl.index);
router.get("/:id",allWorldsCtrl.show);

module.exports = router;
