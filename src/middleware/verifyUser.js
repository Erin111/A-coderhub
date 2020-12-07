const service = require('../service/user.service');
const errorTypes = require('../constants/errorTypes');
const {md5password} = require('../utils/password-handle')

const verifyUser = async (ctx, next) => {
    //1.拿到客户端传过来的用户名和密码
    const {username, password} = ctx.request.body;
    //2.判断用户名和密码是否为空
    if (!username || !password) {
        const err = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
        return ctx.app.emit('error', err, ctx);
    }
//    3.判断用户名是否已经存在
    const result = await service.getUserName(username);
    console.log(result);
    if (result.length) {
        // console.log(result)
        const err = new Error(errorTypes.NAME_HAS_ALREADY_EXISTED);
        return ctx.app.emit('error', err, ctx);
    }
    await next();
}
const handlePassword = async (ctx,next)=>{
    let {password} = ctx.request.body;
    //将密码进行加密
    ctx.request.body.password = md5password(password);
    await next();
}
module.exports = {
    verifyUser,
    handlePassword
}