const koa = require('koa');

const bodyParser = require('koa-bodyparser')

const errorHandel = require('../app/error_handel')
const userRouter = require('../router')

const app = new koa();
app.userRouter = userRouter
app.use(bodyParser())
app.userRouter()

app.on('error',errorHandel)

module.exports = app;