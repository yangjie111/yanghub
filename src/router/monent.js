const Router = require('koa-router');
const {create,detail,list,update,remover,addLabel,fileInfo} = require('../contrller/moment')
const {verifyAuth,verifyPermission} = require('../middleware/user_login')
const {verifyLabelExists} = require('../middleware/label')
const momentRouter = new Router({prefix:'/moment'})

momentRouter.post('/',verifyAuth,create)
momentRouter.get('/',list)
momentRouter.get('/:momentId',detail)
momentRouter.patch('/:momentId',verifyAuth,verifyPermission,update)
momentRouter.delete('/:momentId',verifyAuth,verifyPermission,remover)

// 给动态添加标签
momentRouter.post('/:momentId/labels',verifyAuth,verifyPermission,verifyLabelExists,addLabel)

// 查看配图
momentRouter.get('/images/:filename',fileInfo)

module.exports = momentRouter;