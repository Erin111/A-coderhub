const service = require('../service/label.service');

class LabelController {
    async create(ctx, next) {
        const {name} = ctx.request.body;
        const result = await service.create(name);
        ctx.body = result
    }
    async list(ctx,next){
        const {offset,size} = ctx.query;
        const result = await service.getLabelList(offset,size);
        ctx.body = result
    }
    async getLabelByMomentId(ctx,next){
        const momentId = ctx.params;
        const result = await service.getLabelByMomentId(momentId);
        ctx.body = result
    }
}

module.exports = new LabelController();