let mongoose = require('mongoose');

let schema = mongoose.Schema({

    name:{
        type:String,
        required: [true,"商品名称不能为空"],
        unique : true
    },
    price:{
        type:String,
        required:[true,"商品价格不能为空"]
    },
    stock: {
        type:Number,
        default: 0
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        required : [true,"分类不能为空！！"]
    },
    desc: {
        type:String
    },
    isOnSale: {
        type:Boolean,
        default:true
    },
    created : {
        type: Date,
        default: Date.now()
    }

},{ collection: 'product'});


module.exports = mongoose.model('product',schema)