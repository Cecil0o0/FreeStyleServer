const xmorse = require('xmorse')
const RequestSchema = require('../../util/resultSchema')

function morse (router) {
  router.get('/morse/encode', ctx => {
    const str = ctx.query.str
    ctx.response.body = RequestSchema({
      data: xmorse.encode(str)
    })
  })

  router.get('/morse/decode', ctx => {
    const code = ctx.query.code
    ctx.response.body = RequestSchema({
      data: xmorse.decode(code)
    })
  })
}

module.exports = morse
