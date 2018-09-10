let User = require('../model/userModel');
let crypto = require('lxj-crypto');
let config = require('../config');


//登入user = {username:zhihua,password:123}
async function loginUser(user) {
    //对密码加密
    user.password = crypto.sha1Hmac(user.password,user.username);

    //查询用户
    let res = await User.findOne({username:user.username,password:user.password});

    if(!res){
        throw Error("用户密码错误！")
    }

    //3. 给用户生成一个token，可以用aes算法生成

    let tokenData = {
        username: user.username,
        //expire: Date.now() + config.TokenExpire     //设置过期时间
        expire: Date.now() + config.TokenExpire     //设置过期时间
    }

    let token = crypto.aesEncrypt(JSON.stringify(tokenData),config.TokenKey);

    return token;

}



//注册 user = {username:zhihua,password:123}
async function registerUser(user) {
    //先查询用户是否存在
    if (await isUserExist(user.username)) {
        throw Error(`用户名为${username}的用户已经存在`)
    }
    //密码加密
    user.password = crypto.sha1Hmac(user.password,user.username);
    user.role = 0;
    let res = await User.create(user);

    //返回时密码处理为空
    res.password = "";
    return res;
}



// 获取用户信息
async function getUserInfo(username) {
    let res =await User.findOne({username:username}).select(['-password','-__v']);
    if(!res){
        throw Error(`用户名为${username}的用户不存在`)
    }
    return res;
}


// 删除用户

async function deleteUser(username) {


   let res =  await User.deleteOne({username:username});
   if(res.n < 1){
       throw Error('用户删除失败！')
   }

}

//查询用户是否存在

async function  isUserExist(username) {
    let res =await User.findOne({username:username});
    if(res){
       return true;
    }
    return false;
}


module.exports = {
    registerUser,
    getUserInfo,
    deleteUser,
    loginUser
}