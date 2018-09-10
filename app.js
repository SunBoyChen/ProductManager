//处理异常
require('express-async-errors');
let config = require('./config');
require('./db');
let express = require('express');
let app = express();
let morgan = require('morgan');

let bodyParser = require('body-parser');

let userRouter = require('./router/user');

let result = require('./utils/resultUtil');

let categoryRouter = require('./router/category');

let productRouter = require('./router/product');

let orderRouter = require('./router/order');


// 注册日志打印中间件
app.use(morgan('combined'));
//解析json
app.use(bodyParser.json());


//自定义中间建
app.use(require('./middleware/token_md'));//token认证的中间件

app.use(require('./middleware/permission_md'));  //用户授权




//用户模块
app.use('/user',userRouter);

app.use('/category',categoryRouter);

app.use('/product',productRouter);

app.use('/order',orderRouter);

app.use((err,req,res,next) => {
    result.fail(res,err.toString())
});


app.listen(config.PORT);

