const jwt = require('jsonwebtoken')

const errorType = require('../constant/error_type')
const service = require('../service/user')
const authService = require('../service/auth')
const md5password = require('../utils/handel_password')
const {PUBLIC_KEY} = require('../app/config')

const verifyLogin = async (ctx,next) => {
  const {name,password} = ctx.request.body
  // 1.判断用户名或者密码是否为空
  if(!name || !password){
    const message = new Error(errorType.NAME_OR_PASSWORD_IS_NULL)
    return ctx.app.emit('error',message,ctx)
  }

  // 2.判断用户是否存在
  const result = await service.getUserByName(name)
  if(!result.length){
    const message = new Error(errorType.USER_DOES_NOT_EXISTS)
    return ctx.app.emit('error',message,ctx)
  }
  // 3.判断密码是否正确（加密后验证）
  // 注意：传入的密码必须是字符串
  if(md5password(password) !== result[0].password){
    const message = new Error(errorType.PASSWORD_IS_INCORRECT)
    return ctx.app.emit('error',message,ctx)
  }

  ctx.user = result[0]
  await next()
}

const verifyAuth = async (ctx,next) => {
  console.log('验证用户权限');
  const authorization = ctx.header.authorization
  // 如果没有token
  if(!authorization){
    const error = new Error(errorType.UN_AUTHORIZATION)
    return ctx.app.emit('error',error,ctx)
  }
  const token = authorization.replace('Bearer ','')
  try {
    const result = jwt.verify(token,PUBLIC_KEY,{
      algorithms:['RS256']
    })
    ctx.user = result
    await next()
  } catch (error) {
    console.log(error.message);
    const err = new Error(errorType.UN_AUTHORIZATION)
    ctx.app.emit('error',err,ctx)    
  }

}

const verifyPermission = async(ctx,next) => {
  console.log('验证动态权限的permission');
  // 获取参数
  const [paramsKey] = Object.keys(ctx.params)
  const tableName = paramsKey.replace('Id','')
  const sourceId = ctx.params[paramsKey]
  const {id} = ctx.user

  try {
    const result = await authService.checkResource(tableName,sourceId,id)
    if(!result) throw new Error()
    await next()
  } catch (error) {
    const err = new Error(errorType.UN_AUTHORIZATION)
    return ctx.app.emit('error',err,ctx)
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}