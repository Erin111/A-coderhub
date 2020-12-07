const Router = require('koa-router');
const {create, list, getLabelByMomentId} = require('../controller/label.controller.js');
const {verifyToken} = require('../middleware/auth.middeware');
const labelRouter = new Router({prefix: '/label'});

labelRouter.post('/', verifyToken, create);
labelRouter.get('/', list);
labelRouter.get('/:momentId',getLabelByMomentId)
module.exports = labelRouter;