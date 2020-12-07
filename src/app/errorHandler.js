const errorTypes = require('../constants/errorTypes')

const errorHandler = (error, ctx) => {
    let status,message;
    //获取error内容要用 error.message
    switch (error.message){
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400;
            message = '用户名或密码不能为空';
            break
        case errorTypes.NAME_HAS_ALREADY_EXISTED:
            status = 409;
            message = '用户名已被注册';
            break
        case errorTypes.USER_DOES_NOT_EXIST:
            status = 400;
            message = '用户名不存在';
            break
        case errorTypes.PASSWORD_IS_INCORRECT:
            status = 400;
            message = '密码错误';
            break
        case errorTypes.UN_PERMISSION:
            status = 401;
            message = '您不具备操作的权限';
            break
        case errorTypes.LABEL_HAS_BEEN_CREATED:
            status = 401;
            message = '该动态标签已经创建';
            break
        default:
            status = 400;
            message = 'Not found'
    }
    ctx.status = status;
    ctx.body = message;
}

module.exports = {
    errorHandler
}