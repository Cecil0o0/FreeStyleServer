// state
// 1000      成功
// 1100      失败

// level
// 0          无
// 10         警告
// 20         错误
const f = ({ state = 1000, msg = '成功', data = {}, level = 0 }) => {
  return JSON.stringify({
    state,
    msg,
    data,
    level
  })
}

module.exports = f
