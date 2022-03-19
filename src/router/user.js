const Router = require('koa-router');
const {verifyUser,handelPassword} = require('../middleware/user')
const {create,avatarInfo} = require('../contrller/user')

const userRouter = new Router({prefix:'/user'})

// 用户路由有三个中间件
// verifyUser：对用户数据进行验证
// handelPassword：对用户密码进行加密
// create：创建用户
userRouter.post('/',verifyUser,handelPassword,create)
userRouter.get('/:userId/avatar',avatarInfo)

module.exports = userRouter;