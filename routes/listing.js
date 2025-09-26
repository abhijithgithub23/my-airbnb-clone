const express=require("express");
const router=express.Router();

const Listing=require("../models/listing.js");  
const wrapAsync=require("../utils/wrapAsync.js"); 

const listingController=require("../controllers/listings.js");

// Multer for Image upload
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({ storage });
 
//Middlewares -------------------------------------------------------------------------------------
const {isLoggedIn, isOwner, validateListing }=require("../middleware.js");

//Listings-------------------------------------------------------------------------------------------

// ALL LIST /  NEW LIST ----------------------------------
router.route("/")
.get( wrapAsync(listingController.index))
.post( isLoggedIn, 
    validateListing, 
    upload.single("listing[image]"), 
    wrapAsync(listingController.createListing));


//NEW ROUTE - FORM TO CREATE NEW LIST  ------static route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// SHOW A LIST ITEM / UPDATE THE CHANGES / DELETE A LIST ITEM
router.route("/:id") 
.get(  wrapAsync(listingController.showListing))
.put( 
    isLoggedIn, 
    isOwner, 
    validateListing, 
    upload.single("listing[image]"), 
    wrapAsync(listingController.updateListing))
.delete( isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


//EDIT ROUTE - EDITING THE LIST -------dynamic route
router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.renderEditForm));


module.exports=router;
