const express=require("express");
const app=express();
const mongoose = require("mongoose");
const listing=require("./models/listing.js");
const data=require("./init/data.js");
const path=require("path");
const { asyncWrapProviders } = require("async_hooks");
app.set("view engine","ejs")
app.use(express.urlencoded({extended : true}))
app.set("views",path.join(__dirname, "views"))
const methodOverride=require("method-override")
app.use(methodOverride("_method"));
const ejsmate=require("ejs-mate")
app.engine("ejs",ejsmate)
app.use(express.static(path.join(__dirname,"/public")))

app.listen(8080,()=>{
    console.log("App is listening on port 8080");
})
const mongo_url='mongodb://127.0.0.1:27017/wanderlust'
main().then(()=>{
    console.log("Connected to db")
}).catch(err=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(mongo_url);
}
app.get("/",(req,res)=>{
    res.send("Ap is listening")
})

// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new listing({
//         title:"My new villa",
//         description:"By the beach",
//         price:1200,
//         location:"Goa",
//         country:"India"
//     });

//     await sampleListing.save();
//     console.log("Data saved")
//     res.send("When you luv soemthing,let it go..\nIf it come backs it's yours if it wont't\n it was never your's to begin with")
// })


app.get("/listing",async(req,res)=>{
    const allListings= await listing.find({})
    res.render("listings/index.ejs",{allListings})
})

//new route
app.get("/listing/new",(req,res)=>{
    res.render("listings/new.ejs")
})



//new list post
app.post("/listing",async (req,res)=>{
   const list=req.body.listing
 const newListing= new listing(req.body.listing);
 await newListing.save()
res.redirect("/listing")
})

//index route
app.get("/listing/:id",async (req,res)=>{
    let {id}=req.params;
      const list=await listing.findById(id)
    //   console.log(list)
      res.render("listings/show.ejs",{list})
})



//edit route
app.get("/listing/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const list=await listing.findById(id)
    res.render("listings/edit.ejs",{list})
})

//put route
app.put("/listing/:id",async (req,res)=>{
    let {id}=req.params
    await listing.findByIdAndUpdate(id,{...req.body})
    res.redirect(`/listing/${id}`)
})

app.delete("/listing/:id",async (req,res)=>{
    let {id}=req.params;
    let deletedlist=await listing.findByIdAndDelete(id)
    console.log(deletedlist)
    res.redirect("/listing")
    
})