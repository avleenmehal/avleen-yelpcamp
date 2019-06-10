var express = require("express");
var router = express.Router({mergeParams:true});

var Campground = require("../modules/campground");
var Comment = require("../modules/comment");
var middlewareObject = require("../middleware");


//================//
//COMMENT route

router.get("/campgrounds/:id/comments/new", middlewareObject.isLoggedIn, function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});
        }
    });
});

//POST ROUTE FRO COMMENTS
router.post("/campgrounds/:id/comments", middlewareObject.isLoggedIn, function(req,res){
   Campground.findById(req.params.id,function(err,campground){
      if(err){
          console.log(err);
          res.redirect("/campgrounds")
      } else{
          Comment.create(req.body.comment,function(err,comment){
              if(err){
                  console.log(err);
              }else{
                  //add username and id to the comment..
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  comment.save();
                  
                  campground.comments.push(comment);
                  campground.save();
                  req.flash("success", "Added your comment successfully");

                  res.redirect('/campgrounds/' + campground._id);
              }
          });
      }
   });
});

//EDIT ROUTE
router.get("/campgrounds/:id/comments/:comment_id/edit",middlewareObject.checkCommentOwner, function(req,res){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            if(err){
                res.redirect("back");
            } else{
                res.render("comments/edit",{campground_id:req.params.id, comment:foundComment});
            }
        })
        
});

//UPDATE ROUTE
router.put("/campgrounds/:id/comments/:comment_id",middlewareObject.checkCommentOwner,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            req.flash("error", "Something went wrong");
            res.redirect("back");
        } else{
            req.flash("success", "Successfully changed");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//DESTROY ROUTE
router.delete("/campgrounds/:id/comments/:comment_id",middlewareObject.checkCommentOwner,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            res.redirect("back");
        }else{
            req.flash("success", "Deleted your comment");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

module.exports = router;