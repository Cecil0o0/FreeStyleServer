const Koa = require('koa')
const router = require('./router')
const views = require('koa-views')
const Boom = require('boom')
const path = require('path')

const app = new Koa()

// 设置通用响应头 middleware
app.use(async (ctx, next) => {
  ctx.set('Content-Type', 'application/json')
  await next()
})

// 加载模板引擎
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))

// koa-router
app.use(router.routes())
app.use(router.allowedMethods({
  throw: true,
  notImplemented: () => new Boom.notImplemented(),
  methodNotAllowed: () => new Boom.methodNotAllowed()
}))

// static resources
app.use(require('koa-static')(__dirname + '/dist'))

app.listen(3000)

console.log('Server is listening port 3000')
