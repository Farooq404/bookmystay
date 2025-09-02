const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema =new Schema({
    title:{
        type:String
    },
     description:{
        type:String
    },
     image:{
        filename:String,
        url:String,
        // set:(v)=>v===" "?"":v
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    }
})

const Listing=mongoose.model("Listing", listingSchema);
module.exports=Listing;