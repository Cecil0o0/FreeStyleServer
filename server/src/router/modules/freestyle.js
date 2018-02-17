const FreeStylePlugin = require('free-style-plugin')
const ResultSchema = require('../../util/resultSchema')

// 中文韵脚查词，全押，单押
function freestyle (router) {
  router.get('/free-style/:keyWordParam/:searchTypeParam', async (ctx, next) => {
    const { keyWordParam, searchTypeParam } = ctx.params
    await FreeStylePlugin.getWords(keyWordParam,searchTypeParam).then(res => {
      ctx.response.body = ResultSchema({
        data: res,
        state: 1000
      })
      next()
    }).catch(err => {
      ctx.response.body = ResultSchema({
        state: 1100,
        msg: '查询错误',
        data: ''
      })
    })
  })
}

module.exports = freestyle
