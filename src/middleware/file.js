const multer = require('koa-multer')

const avatarUpload = multer({
  dest:'./upload/avatar'
})
const avatarHandel = avatarUpload.single('avatar')


const pictureUpload = multer({
  dest:'./upload/picture'
})
const pictureHandel = pictureUpload.array('picture',9)

module.exports = {avatarHandel,pictureHandel}