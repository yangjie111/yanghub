const fileService = require('../service/file')
const userService = require('../service/user')

const {APP_HOST,APP_PORT} = require('../app/config')

class FileContrller {
  async saveAvatarInfo(ctx,next){
    const {filename,mimetype,size} = ctx.req.file
    const {id:userId} = ctx.user
    const avatarUrl = `${APP_HOST}:${APP_PORT}/user/${userId}/avatar`
    const result = await fileService.createAvatar(filename,mimetype,size,userId)
    await userService.updateAvatarUrlById(userId,avatarUrl)
    ctx.body = `上传头像成功`
  }

  async savePictureInfo(ctx,next){
    const {files} = ctx.req
    const {id:userId} = ctx.user
    const {momentId} = ctx.query
    for(let file of files){
      const {filename,mimetype,size} = file
      await fileService.createFile(filename,mimetype,size,userId,momentId)
    }
    ctx.body = '上传配图成功'
  }
}

module.exports = new FileContrller()