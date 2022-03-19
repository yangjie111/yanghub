const labelService = require('../service/label')
const verifyLabelExists = async (ctx,next) => {
  // 1.取出所有的标签
  const {labels} = ctx.request.body

  // 2.判断标签是否存在表中
  const newLabels = []
  for(let name of labels){
    // 2.1 根据name获取label信息
    const labelResult = await labelService.getLabelByName(name)
    const label = {name}
    // 2.2 判断是否已经存在，如果不存在就创建标签
    if(labelResult[0]){
      label.id = labelResult[0].id
    } else{
      const result = await labelService.create(name)
      label.id = result.insertId
    }
    // 2.3 将获取到的标签信息添加到数组里
    newLabels.push(label)
  }

  // 3.给ctx赋值一个labels属性，并且将newLabels赋值给labels
  ctx.labels = newLabels;

  // 4.全部执行完成之后调用next
  await next()
}

module.exports = {
  verifyLabelExists
}