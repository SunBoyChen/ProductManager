

let Order = require('../model/orderModel');
let config = require('../config');

let productService = require('./productService');

let Big = require('big.js');


//创建订单只需要有productId,count即可
//order = {productId:"",count:12}
async function addOrder(order) {

    //查询商品
    let product = await productService.findById(order.productId);
    if(!product){
        throw Error("商品信息不存在");
    }

    //判断库存是否足够
    if(product.stock < order.count){
        throw Error("商品库存不够");
    }


    //创建订单
    order.productName = product.name;
    order.productPrice = product.price;
    /*order.totalPrice = Big((order.productPrice).times(order.count));
    //3.给order的字段进行复制
    order.productName = p.name;
    order.productPrice = p.price;*/
    order.totalPrice = Big(order.productPrice).times(order.count);

    let res = await Order.create(order);


    //减去库存
    let update = {
        stock: product.stock - order.count
    };
   await productService.updateProduct(order.productId,update);

    return res;
}

async function getOrdersByPage(page) {

    return await Order.find().skip((page-1)*config.size)
        .limit(config.size).sort("-created").select("-__v");
}


async function getOrderById(id) {
    return await Order.findOne({_id:id});
}

module.exports = {
    addOrder,
    getOrdersByPage,
    getOrderById
}


async function test() {

    /* let order = {
        productId:"5b8fca9d7974064778949701",
        count:10
    }
    console.log(await addOrder(order));
     console.log(12)*/

    let b = Big('123').times(2);
    console.log(b.toString());
}
//test();