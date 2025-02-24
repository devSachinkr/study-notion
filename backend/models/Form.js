const mongoose=require("mongoose");
const Form=new mongoose.Schema({
    firstName:{
    type:String,
    required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    countryCode:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model("Form",Form)