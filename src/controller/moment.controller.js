const fs = require('fs')
const service = require('../service/moment.service')
const momentService = require('../service/moment.service')
const fileService = require('../service/file.service')
const moment_label_service = require('../service/moment_label.service')
const {PICTURE_PATH} = require('../constants/filePath')

class MomentController {

    async create(ctx, next) {
        //1.获取数据（user_id，content）
        const userId = ctx.id;
        const {content} = ctx.request.body;
        //2.将数据插入到数据库里
        const result = await service.create(userId, content);
        ctx.body = result;
    }

    //获取动态详情
    async detail(ctx, next) {
        //    1. 获取数据（momentId）
        const momentId = ctx.params.momentId;
        //    2.根据id查询数据
        const result = await service.getMomentById(momentId);
        ctx.body = result;
    }

    async list(ctx, next) {

        if (!ctx.query) {
            await next();
        }
//        1.获取数据（offset/size)
        const {offset, size} = ctx.query;

//    2.查询列表
        const result = await service.getMomentList(offset, size);

        ctx.body = result;

    }

    async update(ctx, next) {
        const {momentId} = ctx.params;
        const {content} = ctx.request.body;
        //调用momentservice执行数据库语句
        const result = await momentService.updateMoment(momentId, content);
        ctx.body = result;
    }

    async deleteMoment(ctx, next) {
        const {momentId} = ctx.params;
        //调用momentservice执行数据库语句
        const result = await momentService.deleteMoment(momentId);
        ctx.body = result;
    }

    async addLabel(ctx, next) {
        const {momentId} = ctx.params;
        const labelIds = ctx.labelIds;
        let addResult = []
        for (let item of labelIds) {
            // 将对应的moment_id,label_id写入关系表
            let add = await moment_label_service.add(momentId, item);
            addResult.push(add);
        }
        ctx.body = addResult;
    }

    async getImages(ctx, next) {
        let {filename} = ctx.params;
        const result = await fileService.getFileByFileName(filename);
        const {type} = ctx.query
        let types = ['small', 'middle', 'large'];
        if (types.some(item => item === type)) {
            filename = filename + '-' + type
        }
        ctx.response.set('content-type', result[0].mimeType);
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
    }
}

module.exports = new MomentController();