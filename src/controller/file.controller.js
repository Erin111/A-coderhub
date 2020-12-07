const service = require('../service/file.service');
const userService = require('../service/user.service');
const {AVATAR_PATH} = require('../constants/filePath');
const {APP_HOST, APP_PORT} = require('../app/config');

class FileController {
    async avatarInDatabase(ctx, next) {
        //1.获取图像信息
        // console.log(ctx.req.file);
        const {filename, mimetype, size} = ctx.req.file;
        const userId = ctx.id;
        const result = await service.create(filename, size, mimetype, userId);

        //    2.将可以获取头像的地址存储到数据库中
        const avatarURL = `${APP_HOST}:${APP_PORT}/users/${userId}/avatar`
        const avatarURLSave = await userService.addAvatarURL(avatarURL, userId);
        ctx.body = '上传头像成功~';
    }

    async picturesInDatabase(ctx, next) {
        //1.获取图像信息
        const files = ctx.req.files;
        const userId = ctx.id;
        const {momentId} = ctx.query
        for (let file of files) {
            let {filename, mimetype, size} = file;
            await service.createFile(filename,size,mimetype,userId,momentId);
        }
        ctx.body = '上传图片成功'
    }
}

module.exports = new FileController();