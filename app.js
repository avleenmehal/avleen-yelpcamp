var express                 = require("express"),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    Campground              = require("./modules/campground"),
    Comment                 = require("./modules/comment"),
    seedDB                  = require("./seed"),
    flash                   = require("connect-flash"),
    passport                = require("passport"),
    methodOverride          = require("method-override"),
    LocalStrategy           = require("passport-local"),
    User                    = require("./modules/user"),
    passportLocalMongoose   = require("passport-local-mongoose");

var app = express();
var commentRoutes      = require("./routes/comments"),
    campgroundRoutes   = require("./routes/campground"),
    authenticateRoutes = require("./routes/authenticate");

mongoose.connect("mongodb://localhost:27017/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");//for not writing ejs again and aagain
app.use(express.static(__dirname + "/public"));//for the stylesheets file
//seedDB();//seed function

app.use(methodOverride("_method"));

//flash
app.use(flash());

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "me and Aliviva are bonded by God",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//to provide currentuser to each route
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error =req.flash("error");
    res.locals.success =req.flash("success");
    next();
})


app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(authenticateRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Yelccamp server has starrrted !!!!!!!")
});


