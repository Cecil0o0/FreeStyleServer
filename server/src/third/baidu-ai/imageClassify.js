const AipImageClassifyClient = require('baidu-aip-sdk').imageClassify

// 设置APPID/AK/SK
const APP_ID = '10576100'
const AK = 'suFI6nWEZvvK3e5jWMw7jFXU'
const SK = '2R3HhXpFw5xCpd4Q6RQMSU2ycH4OpkPR'

const client = new AipImageClassifyClient(APP_ID, AK, SK)

module.exports = client
