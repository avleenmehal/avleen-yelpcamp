var express = require("express");
var router = express.Router();

var passport = require("passport");
var User = require("../modules/user");

//LANDING page    
router.get("/",function(req,res){
   res.render("landing");
});

//AUTH rOUTES============

//SignUp route
router.get("/register",function(req,res){
    res.render("authenticate/register");
});

//handling up Signup logic
router.post("/register",function(req,res){
    var newUser= new User({username: req.body.username});
    User.register(newUser, req.body.password,function(err,user){
        if(err){
            // console.log(err);
            req.flash("error", err.message);
            return res.render("authenticate/register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success", "Welcome "+ user.username);
            res.redirect("/campgrounds");
        });
    });
});

//login routes
router.get("/login",function(req,res){
    // req.flash("error", "login firsts");
    res.render("authenticate/login");
});

router.post("/login",passport.authenticate("local",
    {
        successRedirect:"/campgrounds",
        failureRedirect: "/login"
    }),function(req,res){
});

//logout ROUTE
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","succesfully logged you out");
    res.redirect("/campgrounds");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;