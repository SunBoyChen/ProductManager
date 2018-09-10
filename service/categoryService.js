
let Category = require('../model/category');
let config = require('../config');


//添加分类  user = {username:文具}
async function addCategory(category) {

    if(awisExist(category.name)) {
        throw Error(`商品分类${category.name}已存在`)
    }
    return await Category.create(category);

}


//删除分类
async function deleteCategory(id) {

    //console.log(id);
    if(!findById(id)) {
        throw Error(`商品分类不存在`)
    }
    let res = await Category.deleteOne({_id: id});
    if(res.n < 1){
        throw Error(`商品分类删除失败`)
    }
}

//修改分类
async function updateCategory(id,category) {
    if(!findById(id)){
        throw Error(`商品分类不存在`)
    }

    let res = Category.update({_id:id},category);

    if(res.n < 1){
        throw Error(`商品分类跟新失败`)
    }
}

//分页查找分类

async function findCategoryByPage(page) {
    let size = config.size;
    return await Category.find().skip((page-1)* size).limit(size).sort("-created").select("-__v")
}



async function findById(id) {
    return await  Category.findOne({_id:id});
}


async function findByName(name) {
    return await  Category.findOne({name:name});
}

async function isExist(name) {

    let category = await findByName(name);

    console.log(category);
    if(!category){
        return false;
    }
    return true;
}


module.exports = {
    addCategory,
    deleteCategory,
    updateCategory,
    findCategoryByPage
}