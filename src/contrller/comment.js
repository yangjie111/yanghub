const commentService = require('../service/comment')

class CommentContrller {
  async create(ctx,next){
    const {content,momentId} = ctx.request.body
    const {id:userId} = ctx.user
    const result = await commentService.create(content,momentId,userId)
    ctx.body = result
  }

  async reply(ctx,next){
    const {content,momentId} = ctx.request.body
    const {commentId} = ctx.params
    const {id:userId} = ctx.user
    const result = await commentService.reply(content,momentId,commentId,userId)
    ctx.body = result
  }

  async update(ctx,next){
    const {commentId} = ctx.params
    const {content} = ctx.request.body
    const result = await commentService.update(content,commentId)
    ctx.body = result
  }

  async remover(ctx,next){
    const {commentId} = ctx.params
    const result = await commentService.remover(commentId)
    ctx.body = result
  }
}

module.exports = new CommentContrller()