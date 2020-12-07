const Router = require('koa-router');

const {create, reply, update, deleteComment,list} = require('../controller/comment.controller.js');
const {verifyToken, verifyPermission} = require('../middleware/auth.middeware')

const commentRouter = new Router({prefix: '/comment'});

commentRouter.post('/', verifyToken, create);
commentRouter.post('/:commentId', verifyToken, reply);
//用户请求某动态的全部评论接口
commentRouter.get('/:momentId',list)
commentRouter.patch('/:commentId', verifyToken, verifyPermission, update)
commentRouter.delete('/:commentId', verifyToken, verifyPermission, deleteComment)
module.exports = commentRouter;