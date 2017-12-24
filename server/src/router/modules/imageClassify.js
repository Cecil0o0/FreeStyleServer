const AipClient = require('../../third/baidu-ai/imageClassify')
const ResultSchema = require('../../util/resultSchema')
const getImageByUrl = require('../../util/image').getImageByUrl

function imageClassify (router) {
  router.get('/baidu-aip/imageClassify/:category', async (ctx, next) => {
    const category = ctx.params.category
    const url = ctx.query.url
    if (!url) {
      ctx.body = ResultSchema({ state: 1100, msg: '请传图片url参数' })
      next()
      return
    }
    if (!category) {
      ctx.body = ResultSchema({ state: 1100, msg: '/${version}/baidu-aip/imageClassify/:category' })
      next()
      return
    }
    if (['dish', 'car', 'animal', 'plant', 'object'].indexOf(category) === -1) {
      ctx.body = ResultSchema({ state: 1100, msg: '当前仅支持dish,car,animal,plant,object' })
      next()
      return
    }
    await AipClient[`${category}Detect`](await getImageByUrl(url)).then(result => {
      if (result.result) {
        ctx.body = ResultSchema({ data: result })
      } else {
        ctx.body = ResultSchema({ data: result, state: 1100, msg: '识别失败' })
      }
    }).catch(err => {
      ctx.body = ResultSchema({ data: err, state: 1100, msg: '识别出错' })
    })
  })
}

module.exports = imageClassify
