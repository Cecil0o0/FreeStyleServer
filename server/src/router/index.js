const Router = require('koa-router')
const FreeStylePlugin = require('free-style-plugin')

const router = new Router({
  prefix: '/v1'
})

router.get('/free-style/:keyWordParam/:searchTypeParam', async (ctx, next) => {
  const { keyWordParam, searchTypeParam } = ctx.params
  FreeStylePlugin.getWords(keyWordParam,searchTypeParam).then(res => {
    ctx.set('X-SERVER-FROM', 'chenhaojie')
    ctx.set('Content-Type', 'application/json')
    ctx.response.body = JSON.stringify({
      data: res,
      state: 1000
    })
    next()
  }).catch(err => {
    ctx.response.body = JSON.stringify({
      state: 1100,
      msg: '查询错误',
      data: ''
    })
  })
})

module.exports = router
