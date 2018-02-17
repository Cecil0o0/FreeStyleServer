const xmorse = require('xmorse')
const RequestSchema = require('../../util/resultSchema')

function morse (router) {
  router.get('/morse/encode/:str', ctx => {
    const {str} = ctx.params
    ctx.response.body = RequestSchema({
      data: xmorse.encode(str)
    })
  })

  router.get('/morse/decode/:code', ctx => {
    const {code} = ctx.params
    ctx.response.body = RequestSchema({
      data: xmorse.decode(code)
    })
  })
}

module.exports = morse
