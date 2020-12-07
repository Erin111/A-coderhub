const labelService = require('../service/label.service');
const moment_label_service = require('../service/moment_label.service');
const {LABEL_HAS_BEEN_CREATED} = require('../constants/errorTypes')
const verifyExists = async (ctx, next) => {
    //拿到所有标签
    const {labels} = ctx.request.body;
    let labelIds = []
    for (let item of labels) {
        //查看标签表里是否有标签，没有就创建
        let result = await labelService.getLabelByName(item);
        if (!result.length) {
            const label = await labelService.create(item);
            labelIds.push(label.insertId);
        } else {
            labelIds.push(result[0].id);
        }
    }
    ctx.labelIds = labelIds;
    await next();
}
const verifyMomentLabelExists = async (ctx, next) => {
    //判断动态和标签的关系表里是否已经关联了
    //也就是该动态是否已经添加过该标签了
    const {momentId} = ctx.params;
    const labelIds = ctx.labelIds;
    let isExists = true;
    for (let item of labelIds) {
        const result = await moment_label_service.getRelationByLabelId(item, momentId);
        if (result.length) {
            isExists = false
            const error = new Error(LABEL_HAS_BEEN_CREATED);
            ctx.app.emit('error', error, ctx);
        }
    }
    if(isExists){
        await next()
    }

}
module.exports = {verifyExists, verifyMomentLabelExists}