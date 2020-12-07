const fs = require('fs')
const service = require('../service/user.service');
const fileService = require('../service/file.service');
const {AVATAR_PATH} = require('../constants/filePath')

//对用户的注册请求进行操作
class UserController {
    async create(ctx, next) {
        //    获取用户请求传递的参数
        const user = ctx.request.body
        //    查询插入数据：抽到service里面
        const result = await service.create(user)
        //    返回数据
        ctx.body = result;
    }

    async avatar(ctx, next) {

        const {userId} = ctx.params;
        const result = await fileService.getAvatarByUserId(userId);
        const mimetype = result[0].mimeType;
        //提供头像信息
        console.log(result[0]);
        ctx.response.set('content-type', mimetype);
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result[0].filename}`);
    }
}
module.exports = new UserController();