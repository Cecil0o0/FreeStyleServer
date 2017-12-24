const AipClient = require('../../third/baidu-ai/imageClassify')
const ResultSchema = require('../../util/resultSchema')
const fs = require('fs')
const request = require('co-request')
const path = require('path')

function imageClassify (router) {
  router.get('/baidu-aip/imageClassify/vehicle', async (ctx, next) => {
    const url = ctx.query.url
    if (!url) {
      ctx.body = ResultSchema({
        state: 1100,
        msg: '请传图片url参数'
      })
      next()
    } else {
      let response = await request.get({
        url,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36',
          'Accept-Encoding': 'gzip, deflate',
          'accept': 'image/webp,image/apng,image/*,*/*;q=0.8'
        },
        // https://segmentfault.com/a/1190000002787763
        // 编解码问题请看这篇博客
        encoding: null
      })

      const car = Buffer.from(response.body, 'binary').toString('base64')

      await AipClient.carDetect(car).then(result => {
        if (result.result) {
          ctx.body = ResultSchema({
            data: result
          })
        } else {
          ctx.body = ResultSchema({
            data: result,
            state: 1100,
            msg: '失败'
          })
        }
      }).catch(err => {
        ctx.body = ResultSchema({
          data: err,
          state: 1100,
          msg: '错误'
        })
      })
    }
  })
}

module.exports = imageClassify
