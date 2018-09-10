let express = require('express');

let router = express.Router();


let result = require('../utils/resultUtil');
let categoryService = require('../service/categoryService');

let utils = require('../utils/resultUtil');



router.get('/',async (req,res) => {

    const  page = req.query.page;


    const data = await categoryService.findCategoryByPage(page);

    utils.success(res,data);

});

router.post('/add',async (req,res) => {

    const category =  await categoryService.addCategory(req.body);
    utils.success(res,category);
})


router.post('/update/:id', async (req,res) => {

    await  categoryService.updateCategory(req.params.id,req.body)
    utils.success(res)
})

router.delete('/delete/:id', async (req,res) => {

    await categoryService.deleteCategory(req.params.id);
    utils.success(res);
})

module.exports=router;