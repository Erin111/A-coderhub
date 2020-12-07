 const service = require('../service/comment.service.js')
class CommentController{
    async create(ctx,next){
        const userId = ctx.id;
        const {content,momentId} = ctx.request.body;
         const result = await service.create(content,momentId,userId);
        ctx.body = result;

    }
    async reply(ctx,next){
        const userId = ctx.id;
        const {commentId} = ctx.params;
        const {content, momentId} = ctx.request.body;
        console.log(content,momentId)
        const result = await service.reply(content,momentId,commentId,userId);
        ctx.body = result;
    }
    async update(ctx,next){
        const  {commentId} = ctx.params;
        const {content} = ctx.request.body;
        const result = await service.update(content,commentId);
        ctx.body = result;
    }
    async deleteComment(ctx,next){
        const {commentId} = ctx.params;
        const result = await service.deleteComment(commentId);
        ctx.body = result
    }
    async list(ctx,next){
        const {momentId} = ctx.params;
        const result = await service.getListByMomentId(momentId)
        console.log(result);
        ctx.body = result;
    }
}
module.exports = new CommentController();