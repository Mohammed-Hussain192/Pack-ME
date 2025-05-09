const mongoose = require('mongoose')


const userSchema =mongoose.Schema( {
    fullname:{
        type:String,
        minLenght:3,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
    },
    state:{
        type:String,
    },
    password:String,
    phone:{
        type:String,
        
    },
    call:{
        type:String,
    },
  pin:{
    type:String,
    default:0
  },
    location:{
        type:String,
        default:"",
    }
   

});

module.exports=mongoose.model("user",userSchema)