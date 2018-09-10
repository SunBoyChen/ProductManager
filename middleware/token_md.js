
let crypto = require('lxj-crypto');
let config = require('../config');
let userService = require('../service/userService');



// 用来判断当前的用户是否是合法认证的用户
// 具体做法：
//1. 从header中取token，如果没有，则直接拒绝
//2. 如果有token，则校验token的正确性，如果解码解密失败，则直接拒绝

function isExcludeUrl(url) {

    //排除不需要token验证的url集合的正则
    let excludeUrls = [
        /.*\/user\/login/,
        /.*\/user\/register/
    ]

    let isExclude = false;
    excludeUrls.forEach( u => {
        if(u.test(url)){
            isExclude = true;
        }
    });
    return isExclude;
}



module.exports = async (req,res,next) => {

    //判断url是否token验证
    if(!isExcludeUrl(req.url)){
        console.log(req.url);

        //获取token
        let token = req.get('token');

        if(!token){
            throw Error("缺少token");
        }

        //解码token
        let tokenDate;
        try {
            tokenDate = JSON.parse(crypto.aesDecrypt(token, config.TokenKey));
        } catch (e) {
            throw Error("token异常！");
        }

        //判断token是否过期
        if(tokenDate.expire < Date.now()){
            throw Error("token已经过期请重新登入！");
        }

        //根据token查询用户，并且绑定到req上面
        let userName = tokenDate.username;
        let userInfo = await userService.getUserInfo(userName);

        //绑定到req上
        req.user=userInfo;
    }
    next();
}