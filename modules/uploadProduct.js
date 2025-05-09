const mongoose = require('mongoose')


const Product =mongoose.Schema( {
   
    productname:String,
    producttype:String,
    productdesc:String,
    productimage:String,
    productprice:Number,
    productrate:Number,
    

});

module.exports=mongoose.model("product",Product)