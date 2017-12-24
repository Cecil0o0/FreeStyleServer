const AipSpeechClient = require('baidu-aip-sdk').speech

// voice recognition
// 设置APPID/AK/SK
const APP_ID = '10541534'
const AK = 'UwG12iGzuDykx9Mju14FFp5G'
const SK = 'nIVgz51pEuvHNKv4GoLYZZw4xnKZX810'

const client = new AipSpeechClient(APP_ID, AK, SK)

module.exports = client
