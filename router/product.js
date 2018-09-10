let express = require('express');

let router = express.Router();

let productService = require('../service/productService');

let result = require('../utils/resultUtil');



router.get('/',async (req,res) => {
    const  page = req.query.page;
    console.log(page);
    let products = await productService.findProductByPage(page);
    result.success(res,products);
});


router.get('/one/:id',async (req,res) => {
    let product = await productService.findById( req.params.id);
    result.success(res,product);
});


router.post('/update/:id',async (req ,res ) => {
    await productService.updateProduct(req.params.id,req.body);
    result.success(res);
});

router.post('/add',async (req ,res ) => {
    let product = await productService.addProduct(req.body);
    result.success(res,product);
});

router.delete('/delete/:id',async (req ,res ) => {
    await productService.deleteProduct(req.params.id);
    result.success(res);
});

module.exports = router;


//url多个参数怎么接受