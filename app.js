if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}


//express--------------------------------
const express=require("express");                          
const app=express();
//path-----------------------------------
const path=require("path");                                  
app.set("view engine","ejs"); 

//path for views-------------------------------------------------------------
app.set("views", path.join(__dirname, "views"));   
//path for public -----------------------------------------------------------        
app.use(express.static(path.join(__dirname, "public")));    

//middleware-----------------------------------------------------------------
app.use(express.urlencoded({extended:true}));               
app.use(express.json());
  
//method-overide middleare-----------------------------------------------------
const methodOverride=require("method-override");            
app.use(methodOverride("_method"));

//setting ejs------------------------------------------------------------------
const ejsMate=require("ejs-mate");                          
app.engine("ejs",ejsMate); 

//Listing Route----------------------------------------------------------------
const listings=require("./routes/listing.js");         
//Review Route------------------------------------------------------------------
const reviews=require("./routes/review.js");             
//User Route------------------------------------------------------------------
const users=require("./routes/user.js");             


//Custom Error Class------------------------------------------------------------
const ExpressError=require("./utils/ExpressError.js");      

// mongoose DB ------------------------------------------------------------------
const mongoose=require("mongoose");                         
//Connecting MongoDB

// const MONGO_URL="mongodb://127.0.0.1:27017/airbnb";  
const dbUrl=process.env.ATLASDB_URL;  

main().then(()=>{console.log("DB Connected");}).catch((err)=>{console.log(err);});
async function main() {
    await mongoose.connect(dbUrl);
}

// Session------------------------------------------------------------------------
const session=require("express-session");    
const MongoStore=require("connect-mongo");        
const cookie = require("express-session/session/cookie.js");

//Session Options for Mongo storage online
const store=MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret: process.env.SESSIONSECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", ()=>{
    console.log("Error on Mongo Session Store", err);
});

//Session Options for local storage
const sessionOptions={   
    store,                             
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, 
    }
};
app.use(session(sessionOptions));   

//Passport ( always after session )------------------------------------------------------
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect Flash----------------------------------------------------------------------
const flash=require("connect-flash");                 
app.use(flash());


//Middleware for Connect-Flash and Current User------------------------------------------
app.use((req, res, next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});

//User signUp / login Pages--------------------------------------------------------------------
app.use("/", users);

//Listing Pages------------------------------------------------------------------------
app.use("/listings", listings);

//Review Page--------------------------------------------------------------------------
app.use("/listings/:id/reviews", reviews);

//ERROR HANDLERS ----------------------------------------------------------------------
//Page not Found Error Handling
app.use((req, res, next)=>{
    next(new ExpressError(404, "Page Not Found")); 
});

// Error Handler
app.use((err, req, res, next)=>{            
    let {status=500, message="Something went Wrong"}=err;
    res.status(status).render("error.ejs", {message});
    // res.status(status).send(message);

});

let port=8080;
app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
});