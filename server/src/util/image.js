const request = require('co-request')

async function getImageByUrl (url) {
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

  return Buffer.from(response.body, 'binary').toString('base64')
}

module.exports = {
  getImageByUrl
}
