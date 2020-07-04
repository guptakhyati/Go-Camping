var express=require("express");
var router=express.Router();
var passport=require("passport");
var User=require("../models/user");

// Campground.create(

//     {
//         name:"Camping de la Cascade,Belgium",
//         image:"https://i.guim.co.uk/img/media/74ff5a019a9e3541a5568acbf44b248af5a36941/0_168_5150_3089/master/5150.jpg?width=860&quality=85&auto=format&fit=max&s=1973fcddddb661345ef98afd1e59063d",
//         description:"This is a great camping ground in belgium situated amidst beautiful green nature."

//     },function(err,campground){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(campground);
//     }
// });

// var campgrounds=[
//     {name:"Mount Cook National Park, New Zealand",image:"https://www.roughguides.com/wp-content/uploads/2017/02/hooker-valley-mount-cook-new-zealand-shutterstock_744677587.jpg"},
//     {name:"Camping de la Cascade,Belgium",image:"https://i.guim.co.uk/img/media/74ff5a019a9e3541a5568acbf44b248af5a36941/0_168_5150_3089/master/5150.jpg?width=860&quality=85&auto=format&fit=max&s=1973fcddddb661345ef98afd1e59063d"},
//     {name:"Campsite Nature Ferie,Denmark",image:"https://i.guim.co.uk/img/media/83735910dfbd8a620122ed9feefc108e9307430c/0_248_7360_4417/master/7360.jpg?width=1920&quality=85&auto=format&fit=max&s=df9dda25bfacd7347767f5a0a1bb2a52"}
//     ]

router.get("/",function(req,res){
    res.render("landing");
})





//========================================
//AUTH ROUTES
//========================================


//SIGNUP
router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to Yelpcamp "+user.username);
            res.redirect("/campgrounds");
        })
    })
});

//LOGIN
router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login",passport.authenticate("local",{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}),function(req,res){

});

//LOGOUT
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged You Out!"); ////////////////////
    res.redirect("/campgrounds");
})

//REQUIRED
module.exports=router;