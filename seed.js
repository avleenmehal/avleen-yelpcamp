var mongoose = require ("mongoose");
var Campground = require("./modules/campground");
var Comment = require("./modules/comment"),
    User    = require("./modules/user");

var data=[
    {
        name: "Rijuls choice",
        image:"https://farm4.staticflickr.com/3498/3905765143_446dcd0e2c.jpg",
        description: "It has a great view of the fluffy clouds.."
    },
    {
        name: "Avleens choice",
        image:"https://farm8.staticflickr.com/7356/9911335176_04dbd4e758.jpg",
        description: "this place is located in mountain ranges where we all can enjoy playing with snow and do some fun.."
    },
    {
        name: "Sureels choice",
        image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
        description: "A great camping site with romantic nights where all can get drunk and have those typical type of parties.."
    },
    {
        name: "Jassas choice",
        image:"https://farm1.staticflickr.com/233/515523753_0699bdbe89.jpg",
        description: "He is punjabi and wants a camp where we can a whiskey with a spicy tandoori chicken wiht songs and friends to dance and enjoy with.."
    }
    ]

function seedDB(){
    //remove all user
    User.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("we have also deleted all login info");
    })
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("WE HAVE DELETED ALL THE PREVIOS DATA");
        //adding seed campgrounds
        // data.forEach(function(camp){
        //     Campground.create(camp,function(err,campground){
        //         if(err){
        //             console.log(err);
        //         }
        //     else{
        //             Comment.create({
        //                 text:"I LOVE YOU ALOT AVLEEEN",
        //                 author: "Alivia banerjee"
        //                 },function(err,comment){
        //                     if(err){
        //                         console.log(err);
        //                     } else{
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                                 // foundcamp.comments.push(comment);
        //                                 // foundcamp.save(function(err,data){
        //                                 //     if(err){
        //                                 //         console.log(err);
        //                                 //     }else{
        //                                 //         console.log(data);
        //                                 //     }
        //                                 // });
        //                         }
        //           });
        //         }
        //     });
        // });
    });
}

module.exports = seedDB;
