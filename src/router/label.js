const Router = require('koa-router')
const labelRouter = new Router({prefix:"/label"})

const {create,list} = require('../contrller/label.js')
const {verifyAuth} = require('../middleware/user_login')

labelRouter.post('/',verifyAuth,create)
labelRouter.get('/',list)

module.exports = labelRouter