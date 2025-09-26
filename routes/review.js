const express=require("express");
const router=express.Router({ mergeParams: true });

const Listing=require("../models/listing.js");  
const Review=require("../models/review.js");  
const wrapAsync=require("../utils/wrapAsync.js"); 

const reviewController=require("../controllers/reviews.js");

// Middleware-----------------------------------------------------------------------------------
const {isLoggedIn, validateReview, isReviewAuthor }=require("../middleware.js");
 
//REVIEWS--------------------------------------------------------------------------------------------
// ADD REVIEW ROUTE
router.post("/",
    isLoggedIn, 
    validateReview, 
    wrapAsync( reviewController.createReview));

//DELETE REVIEW
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview));

module.exports=router;

