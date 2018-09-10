let mongoose = require('mongoose');

let schema = mongoose.Schema({
    username: {
        type: String,
        unique: [true,"用户名已经存在"],
        required: [true,"用户名不能缺少"]
    },
    password : {
        type: String,
        required:[true,"密码不能为空"]
    },
    age : {
        type: Number,
        min: [0,"年龄不能小于0"],
        max: [120,"年龄不能大于120"],
        default : 10
    },
    role : {
        type: Number,
        default:0     //角色,0: 普通用户, 10是商家， 100是管理员
    },
    created: {
      type : Date,
      default: Date.now()
    }

});


module.exports = mongoose.model('user',schema);