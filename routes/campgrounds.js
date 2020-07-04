//REQUIRED
var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middleware=require("../middleware");

//INDEX
router.get("/",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{campground:allCampgrounds});        
        }
    });
    //res.render("campgrounds",{campgrounds:campgrounds});

        
});


//CREATE
router.post("/",middleware.isLoggedIn,function(req,res){
      var name=req.body.name;
      var price=req.body.price;
      var image=req.body.image;
      var description=req.body.description;
      var author={
          id:req.user._id,
          username:req.user.username
      }
      var newCampground={name:name,price:price,image:image,description:description,author:author};
      Campground.create(newCampground,function(err,newlyCreated){
          if(err){
              req.flash("error","Something went wrong")
              console.log(err);
          }
          else{
              req.flash("success","Campground created successfully");
              res.redirect("/campgrounds");
          }
      })
      //campgrounds.push(newCampground);
      //res.redirect("/campgrounds");
});


//NEW
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});


//SHOW
router.get("/:id",function(req,res){
     Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
         if(err){
             console.log(err);                 
         }
         else{
             res.render("campgrounds/show",{campground:foundCampground});
         }
     })   
    // res.render("show");
    
});


//EDIT
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    
        Campground.findById(req.params.id,function(err,foundCampground){
             res.render("campgrounds/edit",{campground:foundCampground});
                
        });
});


//UPDATE
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            req.flash("success","Campground edited successfully")
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});


//DESTROY
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            req.flash("Campground deleted successfully");
            res.redirect("/campgrounds");
        }
    })
});


//REQUIRED
module.exports=router;





