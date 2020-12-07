const jwt = require('jsonwebtoken');
const {md5password} = require('../utils/password-handle');

const service = require('../service/user.service');
const authService = require('../service/auth.service')
const errorTypes = require('../constants/errorTypes');
const {PUBLIC_KEY} = require('../app/config');

//用户登录操作的判断
const verifyLogin = async (ctx, next) => {
//    1.获取用户名和密码
    const {username, password} = ctx.request.body;

//    2.判断用户名和密码是否为空
    if (!username || !password) {
        const err = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
        return ctx.app.emit('error', err, ctx);
    }
//    3.判断用户名是否已经存在(不存在)
    const result = await service.getUserName(username);
    if (!result.length) {
        const err = new Error(errorTypes.USER_DOES_NOT_EXIST);
        return ctx.app.emit('error', err, ctx);
    }
//    4.判断密码和数据库中的密码是否一致
    if (md5password(password) !== result[0].password) {
        const err = new Error(errorTypes.PASSWORD_IS_INCORRECT);
        return ctx.app.emit('error', err, ctx);
    }
    ctx.user = result[0];
    await next();

}
const verifyToken = async (ctx, next) => {
    const authorization = ctx.headers.authorization;
    try {
        const token = authorization.replace('Bearer ', '');
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ["RS256"]
        })
        ctx.id = result.id

        await next();

    } catch (e) {
        ctx.body = e.message;

    }
}
//验证是否有修改或删除动态、评论等权限
const verifyPermission = async (ctx, next) => {
    console.log('验证是否有修改或删除动态、评论等权限');
    //1.获取参数
    //获取要查询的表的名字
    const tableName = Object.keys(ctx.params)[0].replace('Id', '');
    //获取params传进来的要修改或删除哪条动态或评论的id
    const resourceId = ctx.params[tableName + 'Id'];
    const id = ctx.id;
    //2.查询是否具有权限
    try {
        const isPermission = await authService.checkResource(tableName, resourceId, id);
        if (!isPermission) {
            throw new Error('用户不具备修改权限');
        }
        await next();
    } catch (e) {
        console.log(e);
        const error = new Error(errorTypes.UN_PERMISSION);
        return ctx.app.emit('error', error, ctx)
    }


}
module.exports = {
    verifyLogin,
    verifyToken,
    verifyPermission
}