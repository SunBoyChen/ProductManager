

let rolePermissions = [

    {
        role: 0,  //商家用户
        permissions: [
            /.*\/product/,
            /.*\/order/,
            /.*\/category/
        ]
    },
    {
        role: 100,  //超级管理员
        permissions: [
            /.*/
        ]
    }
];

module.exports = async (req,res,next) => {

    //获取请求的user信息
    if(req.user){

        let isLetGo = false;
        rolePermissions.forEach(p => {
            if(p.role === req.user.role){
                p.permissions.forEach(per => {
                    if(per.test(req.url)) {
                        isLetGo = true;
                    }
                })

            }
        })

        if(!isLetGo){
            throw Error("当前用户权限不够！！！")
        }

    }
    next();
}