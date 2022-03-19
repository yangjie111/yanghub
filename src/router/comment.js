const Router = require('koa-router')
const {verifyAuth,verifyPermission} = require('../middleware/user_login')
const {create,reply,update,remover} = require('../contrller/comment.js')
const commentRouter = new Router({prefix:'/comment'})


commentRouter.post('/',verifyAuth,create)
commentRouter.post('/:commentId/reply',verifyAuth,reply)

// 修改评论
commentRouter.patch('/:commentId',verifyAuth,verifyPermission,update)

// 删除评论
commentRouter.delete('/:commentId',verifyAuth,verifyPermission,remover)


module.exports = commentRouter