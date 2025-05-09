const mongoose = require('mongoose')


const contactSchema =mongoose.Schema( {
    
    email:{
        type:String,
        unique:true,
    },
    reason:{
        default:"",
        type:String,
    }
   

});

module.exports=mongoose.model("contact",contactSchema)