//REQUIRED
var express=require("express");
var router=express.Router({mergeParams:true});
var Campground=require("../models/campground");
var Comment=require("../models/comment");
var middleware=require("../middleware");

//============================================ 
//COMMENTS
//============================================

//NEW
router.get("/new",middleware.isLoggedIn,function(req,res){

    Campground.findById(req.params.id,function(err,campground){
        res.render("comments/new",{campground:campground});
    })
});


//CREATE
router.post("/",middleware.isLoggedIn,function(req,res){
Campground.findById(req.params.id,function(err,campground){
    if(err){
        console.log(err);
        res.redirect("/campgrounds");
    }
    else{
        Comment.create(req.body.comment,function(err,comment){
            if(err){
                console.log(err);
            }
            else{
                comment.author.id=req.user._id;
                comment.author.username=req.user.username;
                comment.save();
                campground.comments.push(comment);
                campground.save();
                req.flash("success","Comment created successfully");
                res.redirect("/campgrounds/"+campground._id);
            }
        })
    }
})
});


//EDIT
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
            res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});

    })
});


//UPDATE
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("success","Comment edited successfully");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})


//DESTROY
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("success","Comment deleted successfully");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});


//REQUIRED
module.exports=router;