const fs = require('fs')

const momentService = require('../service/moment')
const fileService = require('../service/file')
const {APP_HOST,APP_PORT} = require('../app/config')

class MomentContrller {
  async create(ctx,next){
    const {id} = ctx.user
    const {content} = ctx.request.body
    const result = await momentService.create(id,content)
    ctx.body = result
  }

  async detail(ctx,next){
    // 获取动态id
    const momentId = ctx.params.momentId
    const result = await momentService.getMomentById(momentId)
    ctx.body = result[0]
  }

  async list(ctx,next){
    const {offset,size} = ctx.query
    const result = await momentService.getMomentList(offset,size)
    ctx.body = result
  }

  async update(ctx,next){
    const {momentId} = ctx.params
    const {content} = ctx.request.body
    const result = await momentService.update(momentId,content)
    ctx.body = result
  }

  async remover(ctx,next){
    const {momentId} = ctx.params
    const result = await momentService.remover(momentId)
    ctx.body = result
  }

  async addLabel(ctx,next){
    const {labels} = ctx
    const {momentId} = ctx.params
    for(let label of labels){
      const isExists = await momentService.hasLabel(momentId,label.id)
      if(!isExists){
        await momentService.addLabel(momentId,label.id)
      }
    }
    ctx.body = '给动态添加标签成功'
  }

  async fileInfo(ctx,next){
    const {filename} = ctx.params
    const fileInfo = await fileService.getFileByFileName(filename)
    ctx.response.set('content-type',fileInfo.mimetype)
    ctx.body = fs.createReadStream(`./upload/picture/${filename}`)
  }
}

module.exports = new MomentContrller()