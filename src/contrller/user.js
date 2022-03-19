const fs = require('fs')
const service = require('../service/user')
const fileService = require('../service/file')

class UserContrller {
  async create(ctx,next){
    // 获取用户传递过来的参数
    const user = ctx.request.body
    // 查询数据
    const res = await service.create(user)
    // 返回数据
    ctx.body = res
  }

  async avatarInfo(ctx,next){
    const {userId} = ctx.params
    const avatarInfo = await fileService.getAvatarByUserId(userId)
    ctx.response.set('content-type',avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`./upload/avatar/${avatarInfo.filename}`)
  }
}

module.exports = new UserContrller()