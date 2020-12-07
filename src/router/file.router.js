const Router = require('koa-router');
const {verifyToken} = require('../middleware/auth.middeware')
const {saveAvatar,savePictures,pictureResize} = require('../middleware/file.middleware');
const {avatarInDatabase,picturesInDatabase} = require('../controller/file.controller');
const fileRouter = new Router({prefix:'/upload'});

fileRouter.post('/avatar',verifyToken,saveAvatar,avatarInDatabase);
fileRouter.post('/pictures',verifyToken,savePictures,pictureResize,picturesInDatabase);

module.exports = fileRouter