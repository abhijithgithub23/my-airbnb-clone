const Listing=require("../models/listing");

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index=async(req, res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}

module.exports.renderNewForm=(req, res)=>{
    res.render("listings/new.ejs");
}

module.exports.createListing=async(req, res)=>{
    let cordinates=await geocodingClient.forwardGeocode({
        query: req.body.listing.location, limit: 1
    }).send();
     
    let url=req.file.path;
    let filename=req.file.filename;

    const listItem = new Listing(req.body.listing);
    listItem.owner=req.user._id;
    listItem.image={ url, filename };
    listItem.geometry=cordinates.body.features[0].geometry;

    let savedlist=await listItem.save();
    // console.log(savedlist);

    req.flash("success", "New List Item Created");
    res.redirect("/listings");
}


module.exports.showListing= async(req, res)=>{
    let {id}=req.params;
    let listItem=await Listing.findById(id)
                        .populate({path: "reviews", populate:{path: "author"}})
                        .populate("owner");
    if(!listItem){
        req.flash("error", " List Item Not Found");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listItem})
}




module.exports.renderEditForm=async(req, res)=>{
    let {id}=req.params;
    let listItem=await Listing.findById(id);
    if(!listItem){
        req.flash("error", " List Item Not Found");
        return res.redirect("/listings");
    }

    let originalImageUrl=listItem.image.url.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listItem, originalImageUrl });
}

module.exports.updateListing=async(req, res)=>{
    let {id}= req.params;
    let listItem= await Listing.findByIdAndUpdate(id, req.body.listing, { new: true, runValidators: true });

    if( typeof req.file!== "undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listItem.image={ url, filename };
        await listItem.save();
    }
    
    req.flash("success", " List Item Updated");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing=async(req, res)=>{
    let {id}=req.params;
    let delItem= await Listing.findByIdAndDelete(id);
    req.flash("success", " List Item Deleted");
    res.redirect("/listings");
}




