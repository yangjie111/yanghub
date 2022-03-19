const errorType = require('../constant/error_type')

const errorHandel = (error,ctx) => {
  let status,message;
  switch (error.message) {
    case errorType.NAME_OR_PASSWORD_IS_NULL:
      status = 400,
      message = '请输入完整的用户名或者密码'
      break;
  
    case errorType.USER_ALREADY_IS_EXISTS:
      status = 409,
      message = '用户已存在'
      break;

    case errorType.USER_DOES_NOT_EXISTS:
      status = 400,
      message = '用户不存在'
      break;

    case errorType.PASSWORD_IS_INCORRECT:
      status = 400,
      message = '密码不正确'
      break;

    case errorType.UN_AUTHORIZATION:
      status = 401,
      message = 'token无效'
      break;

    default:
      status = 404,
      message = 'NOT FOUND'
  }
  ctx.status = status
  ctx.body = message
}

module.exports = errorHandel