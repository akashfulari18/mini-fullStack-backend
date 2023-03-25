
const mongoose = require('mongoose')

const productSchema  = mongoose.Schema({
    productname:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String},
    img:{type:String},
    price:{type:String},
    rating:{type:String},
    cartStatus:{type:Boolean},

})

const ProductModel = mongoose.model("product",productSchema)

module.exports=ProductModel