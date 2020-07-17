var Campground = require("../modules/campground");
var Comment = require("../modules/comment");

//add all the middleware functions
var middlewareObject={};

middlewareObject.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please sign in first");
    res.redirect("/login");
}

middlewareObject.isCheckedOwner = function(req,res,next){
    //is user logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundcampground){
            if(err){
                    req.flash("error", "Something Went wrong");
                } else{
                //does it owns the campground
                if(foundcampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You dont have the permission to do that");
                    res.send("back")
                }
            }
        });    
    }else{
        req.flash("error", "You need to be logged in");
        res.redirect("back");
    }
}

middlewareObject.checkCommentOwner = function(req,res,next){
    //is user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                console.log(err);
            } else{
                //does it owns the campground
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You dont have the permission to do that");
                    res.send("back");
                }
            }
        });    
    }else{
        req.flash("error", "You need to be logged in");
        res.redirect("back");
    }
}
module.exports = middlewareObject;