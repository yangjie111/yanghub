const errorType = require('../constant/error_type')
const service = require('../service/user')
const md5password = require('../utils/handel_password')

const verifyUser = async (ctx,next) => {
  const {name,password} = ctx.request.body
  // 检查name password是否为空
  if(!name || !password){
    const message = new Error(errorType.NAME_OR_PASSWORD_IS_NULL)
    return ctx.app.emit('error',message,ctx)
  }

  // 检查用户是否注册过
  const result = await service.getUserByName(name)
  if(result.length){
    const message = new Error(errorType.USER_ALREADY_IS_EXISTS)
    return ctx.app.emit('error',message,ctx)
  }

  // 将控制权传给下一个中间件函数
  await next()
}

const handelPassword = async (ctx,next) => {
  const {password} = ctx.request.body
  ctx.request.body.password = md5password(password)
  await next()
}

module.exports = {
  verifyUser,
  handelPassword
}