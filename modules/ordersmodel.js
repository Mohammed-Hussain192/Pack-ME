const mongoose = require('mongoose')



const orderSchema=mongoose.Schema({
    email:String,
    productname:String,
    productdesc:String,
    productimage:String,
    productprice:Number,
    phone:Number,
    location:String,
    pin:String,
    mode:String,

})

module.exports=mongoose.model("booked",orderSchema)