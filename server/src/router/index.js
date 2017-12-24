const Router = require('koa-router')

const router = new Router({
  prefix: '/v1'
})

// 中文韵脚查词
require('./modules/freestyle')(router)
// 摩斯密码加解密
require('./modules/xmorse')(router)
// 百度语音识别
require('./modules/speech')(router)
// 百度图像识别
require('./modules/imageClassify')(router)

module.exports = router
