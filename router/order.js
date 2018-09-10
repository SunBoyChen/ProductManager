let express = require('express');

let router = express.Router();

let result = require('../utils/resultUtil');
let orderService = require('../service/orderService');

let utils = require('../utils/resultUtil');


router.get('/',async (req,res) => {

    const  page = req.query.page;

    console.log(req.user);

   let data = await orderService.getOrdersByPage(page);

    utils.success(res,data);

});



router.get('/:id',async (req,res) => {
    console.log(req.params.id);
   let data = await orderService.getOrderById(req.params.id);

    utils.success(res,data);

});


router.post('/add',async (req,res) => {

    let data = await orderService.addOrder(req.body);

    utils.success(res,data);

});


module.exports=router;