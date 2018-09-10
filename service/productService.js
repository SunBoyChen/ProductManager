
let Product = require('../model/productModel');
let config = require('../config');




async function addProduct(product) {
    return await Product.create(product);
}


async function deleteProduct(id) {
    if(!await findById(id)) {
        throw Error("商品不存在！！！")
    }


    let p = await Product.deleteOne({_id:id});

    if(p.n < 1){
        throw Error("商品删除失败！")
    }

}

async function updateProduct(id,product) {

    if(!await findById(id)) {
        throw Error("商品不存在！！！")
    }

    let p = await Product.updateOne({_id:id},product);

    if(p.n < 1){
        throw Error("商品更新失败！")
    }
}

async function findProductByPage(page) {
    return await Product.find().skip((page-1)*config.size)
        .limit(config.size).sort("-created").select("-__v");
}



async  function findById(id) {
    return await Product.findOne({_id:id});
}

module.exports = {
    addProduct,
    deleteProduct,
    updateProduct,
    findProductByPage,
    findById
}