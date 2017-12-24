const Koa = require('koa')
const router = require('./router')
const Boom = require('boom')

const app = new Koa()

// 设置通用响应头 middleware
app.use(async (ctx, next) => {
  ctx.set('Content-Type', 'application/json')
  await next()
})

// koa-router
app.use(router.routes())
app.use(router.allowedMethods({
  throw: true,
  notImplemented: () => new Boom.notImplemented(),
  methodNotAllowed: () => new Boom.methodNotAllowed()
}))

// static resources
app.use(require('koa-static')(__dirname + '/dist'))

// middleware

app.listen(3000)

console.log('Server is listening port 3000')
