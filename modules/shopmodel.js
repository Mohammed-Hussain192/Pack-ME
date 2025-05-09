const mongoose = require('mongoose')


const Shop =mongoose.Schema( {

    shopID:String,
    shopname:String,
    shopemail:String,
    shopaddres:String,
    Shopphone1:String,
    Shopphone2:String,
    state:String,
    shopcity:String,
    pin:String,
    companyowner:String,
    password:String,


    

});

module.exports=mongoose.model("Shop",Shop)