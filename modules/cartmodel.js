const mongoose = require('mongoose')


const cartSchema =mongoose.Schema( {
   email:String,
   productname:String,
   productdesc:String,
   productimage:String,
   productprice:Number,

});

module.exports=mongoose.model("cart",cartSchema)