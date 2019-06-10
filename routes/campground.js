var express = require("express");
var router = express.Router();
var Campground = require("../modules/campground");
var middlewareObject = require("../middleware");


//ALL CAMPGROUNDS
router.get("/campgrounds", function(req,res){
    //get all the campgorunds from the db
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/campgrounds",{campgrounds:allCampgrounds});
        }
    })
});


//POST ROUTE 
router.post("/campgrounds",middlewareObject.isLoggedIn, function(req,res){
    var name= req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newcampground={name:name,image:image,description:desc,author:author};
    Campground.create(newcampground);
    //, function(err,newlycreated){
    //     if(err){
    //         console.log(err);
    //     } else{
    //         res.redirect("/campgrounds");
    //     }
    // })
    res.redirect("/campgrounds");
});


//ADD a new campground
router.get("/campgrounds/new",middlewareObject.isLoggedIn, function(req,res){
   res.render("campgrounds/new"); 
});

//SHOW more about a campgorund
router.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){   //.populate.exec is tp show the contents of the id
    
        if(err){
            console.log(err);
        } else {
            console.log(foundcampground);
            res.render("campgrounds/show",{campground:foundcampground});
        }
    });
});

//EDIT CAMPGROUND
router.get("/campgrounds/:id/edit", middlewareObject.isCheckedOwner,function(req,res){
        Campground.findById(req.params.id, function(err, foundcampground){
            if(err){
                console.log(err);
            } else{
                res.render("campgrounds/edit",{campground:foundcampground});
            }
        });    
});

//UPDATE CAMPGROUND
router.put("/campgrounds/:id",middlewareObject.isCheckedOwner, function(req,res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, udatedcampground){
        if(err){
            console.log(err);
        }else{
            req.flash("success", "Successfully updated");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//DESTROY CAMPGROUND
router.delete("/campgrounds/:id",middlewareObject.isCheckedOwner, function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }else{
            req.flash("success", "Successfully deleted");
            res.redirect("/campgrounds");
        }
    })
})

module.exports= router;