var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var User=require("./models/user");
var mongoose=require("mongoose");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var passportLocalMongoose=require("passport-local-mongoose");
var methodOverride=require("method-override");
var Campground=require("./models/campground"); 
var seedDB=require("./seeds");
var Comment=require("./models/comment");
var flash=require("connect-flash");

var campgroundRoutes=require("./routes/campgrounds");
var commentRoutes=require("./routes/comments");
var indexRoutes=require("./routes/index");


mongoose.connect("mongodb+srv://Khyati:Apar@9871@cluster0.ez1ba.mongodb.net/yelpcamp?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true
});



app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB();

//=================================================   
//PASSPORT CONFIGURATION
//=================================================
app.use(require("express-session")({
    secret:"Rusty is the still the cutest",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");     //////////////////////////
    res.locals.success=req.flash("success");     //////////////////////////
    next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);



app.listen(process.env.PORT || 5000, function() { 
    console.log('YelpCamp server has started'); 
  });







  








  



