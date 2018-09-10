
// 一般我们通过环境变量来切换当前的配置文件
// process.env.NODE_ENV = 'development'  'production'
let conf = null;

if(process.env.NODE_ENV === 'production'){
    conf = require('./prod');
} else  {
    conf = require('./dev');
}



module.exports =  conf;