const Koa = require('koa')
const router = require('./router')

const app = new Koa()

app.use(router.routes())
app.use(router.allowedMethods())

// static resources
app.use(require('koa-static')(__dirname + '/dist'))

// response
app.use(async (ctx, next) => {
  next()
})

app.listen(3000)
