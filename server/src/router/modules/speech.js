const AipClient = require('../../third/baidu-ai/speech')
const ResultSchema = require('../../util/resultSchema')
const fs = require('fs')
const path = require('path')
let testPath = path.resolve(__dirname + '/' + '../../assets/test/voice.amr')

function speechRecognize (router) {
  router.get('/baidu-aip/speech/recognize', async (ctx, next) => {
    let voice = fs.readFileSync(testPath)

    let voiceBuffer = new Buffer(voice)

    // 识别本地文件
    await AipClient.recognize(voiceBuffer, 'amr', 8000).then(result => {
      ctx.response.body = ResultSchema({
        data: JSON.stringify(result),
        state: 1000
      })
      next()
    }, err => {
      ctx.response.body = ResultSchema({
        data: err,
        state: 1100
      })
      next()
    })
  })
}

module.exports = speechRecognize
