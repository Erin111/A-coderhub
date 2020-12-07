const Router = require('koa-router');
const {verifyLogin} = require('../middleware/auth.middeware')
const authController = require('../controller/auth.controller.js')
const authRouter = new Router();

authRouter.post('/login', verifyLogin, authController.login);

// authRouter.post('/test',authController.verifyToken)

module.exports = authRouter;