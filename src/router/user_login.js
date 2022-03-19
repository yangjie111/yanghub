const Router = require('koa-router');
const {verifyLogin,verifyAuth} = require('../middleware/user_login')
const {login,success} = require('../contrller/user_login')
const userLoginRouter = new Router({prefix:'/login'})

userLoginRouter.post('/',verifyLogin,login)
userLoginRouter.get('/test',verifyAuth,success)

module.exports = userLoginRouter;