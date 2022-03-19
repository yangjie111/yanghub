const Router = require('koa-router')
const fileRouter = new Router({prefix:"/upload"})

const {verifyAuth} = require('../middleware/user_login')
const {avatarHandel,pictureHandel} = require('../middleware/file')
const {saveAvatarInfo,savePictureInfo} = require('../contrller/file')

// 1.验证用户是否登录
// 2.将上传的图片保存到指定位置
fileRouter.post('/avatar',verifyAuth,avatarHandel,saveAvatarInfo)
fileRouter.post('/picture',verifyAuth,pictureHandel,savePictureInfo)

module.exports = fileRouter