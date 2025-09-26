// Is user logged in checking function------------------------
const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error", "You must Login");
        return res.redirect("/login");
    }
    next(); 
};

//Redirecting to where user has sent request before login-------
const saveRedirectUrl=(req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl= req.session.redirectUrl;
    }
    next();
}

// Checking the user is owner or not----------------------------
const Listing=require("./models/listing.js");

const isOwner=async(req, res, next)=>{
    let {id}=req.params;
    let listItem=await Listing.findById(id);
    if(!listItem.owner._id.equals(res.locals.currUser._id)){
        req.flash("error", "You Dont have Persmission!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

//Validate Error Function Joi for LISTINGS--------------------------
const ExpressError=require("./utils/ExpressError.js"); 
const {listingSchema}=require("./schema.js"); 

const validateListing=(req, res, next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        const errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

//Validate Error Function Joi for REVIEW
const {reviewSchema}=require("./schema.js"); 

const validateReview=(req, res, next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        const errMsg = error.details.map(el => el.message).join(", ");
        console.log("Review error triggered");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}

// Checking the user is owner or not----------------------------
const Review=require("./models/review.js");

const isReviewAuthor=async(req, res, next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error", "You Didnot Create this Review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports = { isLoggedIn , saveRedirectUrl, isOwner, validateListing, validateReview , isReviewAuthor};
