let express = require('express');
let router = express.Router();

let result = require('../utils/resultUtil');



let userService = require('../service/userService');



router.get('/:username', async (req,res) => {

    let username = req.params.username;
   let userInfo = await userService.getUserInfo(username);
    result.success(res,userInfo);
})

router.post('/login', async (req,res) => {

    let token= await userService.loginUser(req.body);
    result.success(res,token);
})

router.post('/register', async (req,res) =>{
    let user = await userService.registerUser(req.body);
    result.success(res,user);
})

router.delete('/delete/:username', async (req,res) =>{
    await userService.deleteUser(req.params.username)
    result.success(res);
})


module.exports=router;