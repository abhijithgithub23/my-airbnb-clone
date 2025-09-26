const express=require("express");
const router=express.Router({});
const User=require("../models/user.js");

const passport=require("passport");

const wrapAsync=require("../utils/wrapAsync.js"); 
const { Passport } = require("passport");
 
const {saveRedirectUrl}=require("../middleware.js");

const userController=require("../controllers/users.js");

//Sign up Page------------------------------------------------------

router.route("/signup")
.get(  userController.renderSignupForm)
.post(  wrapAsync(userController.signup));

//Login up Page------------------------------------------------------

router.route("/login")
.get( userController.renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}), userController.login);


//Log Out Route------------------------------------------------------

router.get("/logout", userController.logout);


  
module.exports=router;