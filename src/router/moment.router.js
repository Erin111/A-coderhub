const Router = require('koa-router');
const {verifyToken, verifyPermission} = require('../middleware/auth.middeware');
const {verifyExists,verifyMomentLabelExists} = require('../middleware/label.middleware')

const momentRouter = new Router({prefix: '/moment'});

const {
    create, detail, list, update, deleteMoment, addLabel,getImages
} = require('../controller/moment.controller')

momentRouter.post('/', verifyToken, create);

momentRouter.get('/', list);

momentRouter.get('/:momentId', detail);
//修改内容
//修改肯定要用户登录
//用户只能修改自己的动态内容：验证登录的用户是否有权限修改内容
//如果是管理员的话就能修改所有人的
momentRouter.patch('/:momentId', verifyToken, verifyPermission, update);

momentRouter.delete('/:momentId', verifyToken, verifyPermission, deleteMoment);
momentRouter.post('/:momentId/labels', verifyToken, verifyPermission, verifyExists,verifyMomentLabelExists, addLabel);
//给动态配图服务
momentRouter.get('/images/:filename',getImages);


module.exports = momentRouter;