var mongoose=require("mongoose");
var Campground=require("./models/campground");
var Comment=require("./models/comment");

var data=[
    {
        name:"Mount Cook National Park, New Zealand",
        image:"https://www.roughguides.com/wp-content/uploads/2017/02/hooker-valley-mount-cook-new-zealand-shutterstock_744677587.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam sit amet nisl suscipit adipiscing bibendum est. Quis hendrerit dolor magna eget est lorem ipsum dolor. Cursus in hac habitasse platea. Nulla facilisi nullam vehicula ipsum. Aliquam nulla facilisi cras fermentum odio eu feugiat. Nulla posuere sollicitudin aliquam ultrices sagittis orci a. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus."
    },
    {
        name:"Camping de la Cascade,Belgium",
        image:"https://i.guim.co.uk/img/media/74ff5a019a9e3541a5568acbf44b248af5a36941/0_168_5150_3089/master/5150.jpg?width=860&quality=85&auto=format&fit=max&s=1973fcddddb661345ef98afd1e59063d",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam sit amet nisl suscipit adipiscing bibendum est. Quis hendrerit dolor magna eget est lorem ipsum dolor. Cursus in hac habitasse platea. Nulla facilisi nullam vehicula ipsum. Aliquam nulla facilisi cras fermentum odio eu feugiat. Nulla posuere sollicitudin aliquam ultrices sagittis orci a. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus."
    },
    {
        name:"Campsite Nature Ferie,Denmark",
        image:"https://i.guim.co.uk/img/media/83735910dfbd8a620122ed9feefc108e9307430c/0_248_7360_4417/master/7360.jpg?width=1920&quality=85&auto=format&fit=max&s=df9dda25bfacd7347767f5a0a1bb2a52",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam sit amet nisl suscipit adipiscing bibendum est. Quis hendrerit dolor magna eget est lorem ipsum dolor. Cursus in hac habitasse platea. Nulla facilisi nullam vehicula ipsum. Aliquam nulla facilisi cras fermentum odio eu feugiat. Nulla posuere sollicitudin aliquam ultrices sagittis orci a. Est pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus."
    }
]

function seedDB(){
    //REMOVE ALL CAMPGROUNDS:
    Campground.remove({},function(err){
        if(err){
             console.log(err);
        }
        console.log("Removed all campgrounds");
        //CREATE NEW CAMPGROUNDS:
        data.forEach(function(seed){
        Campground.create(seed,function(err,campground){
            if(err){
                console.log(err);
            }
            else{
                console.log("Added a new campground");
                //COMMENT CREATE:
                Comment.create({
                    text:"This is a beautiful place!",
                    author:"Homer"
                },function(err,comment){
                    if(err){
                        console.log(err);
                    }
                    else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created a new comment");
                    }
                })
            }
        })
       });
     });
    
}



module.exports=seedDB;












