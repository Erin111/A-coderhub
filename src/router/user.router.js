const Router = require('koa-router')

const controller = require('../controller/user.controller')
const {verifyUser,handlePassword} = require('../middleware/verifyUser')
const userRouter = new Router({
    prefix:'/users'
})
//handlePassword对密码进行加密
userRouter.post('/', verifyUser, handlePassword,controller.create);
userRouter.get('/:userId/avatar',controller.avatar);

module.exports = userRouter