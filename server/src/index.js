const Koa = require('koa')
const router = require('./router')

const app = new Koa()

app.use(router.routes())
app.use(router.allowedMethods())

// response
app.use(async (ctx, next) => {
  next()
})

app.listen(3000)
