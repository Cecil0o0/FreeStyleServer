const axios = require('axios')

const Axios = axios.create({
  timeout: 30000,
  withCredentials: true,
  responseType: 'json',
  // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default
  // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的
  headers: {
    'Content-Type': 'application/json'
  }
})

// 当前时间未得到响应的http请求集合
let requestMap = {}

// 当服务端返回状态列表在此数组中，将做对应的toast处理，其余响应均忽略
const skipState = [100, 200, 202, 203, 1000]

// 请求拦截器
Axios.interceptors.request.use(config => {
  // 为每个请求创建一个cancelToken以终止该请求
  let cancel
  config.cancelToken = new axios.CancelToken((c) => {
    cancel = c
  })
  // 防止完全相同的两个请求先后发出
  if (/POST|PUT|DELETE|PATCH/i.test(config.method)) {
      // abort the existed request
    if (requestMap[getUniqueIdentifies(config)]) {
      cancel('请检查是否重复发送两个相同的请求')
    } else {
      requestMap[getUniqueIdentifies(config)] = 'loading'
    }
  }

  return config
}, thrown => {
  console.log('请检查网络1')
  return Promise.reject(thrown)
})

// 响应拦截器
Axios.interceptors.response.use(res => {
  // 为兼容之前php代理请求
  res.data.msg = res.data.errormsg
  delete res.data.errormsg
  // 统一对返回的数据做JSON转换
  try {
    res.config.data = JSON.parse(res.config.data)
  } catch (e) {
    console.log(e)
  }

  // delete current request in the map
  if (requestMap[getUniqueIdentifies(res.config)]) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`url为${res.config.url}的请求已经完成`)
    }
    delete requestMap[getUniqueIdentifies(res.config)]
  }

  return res.data
}, thrown => {
  if (axios.isCancel(thrown)) {
    console.log('Request canceled', thrown.message)
  } else {
    console.log('请检查网络2')
  }
  // 网络故障，重置所有请求
  requestMap = {}
  return Promise.reject(thrown)
})

function getUniqueIdentifies (config) {
  return escape(`${config.method}-${config.url.replace(config.baseURL, '')}-${typeof config.data === 'string' ? config.data : JSON.stringify(config.data)}`)
}

const _POST = (url) => {
  return (body) => Axios.post(url, body)
}

const _GET = (url) => {
  return (params) => Axios.get(url, { params })
}

const _DELETE = (url) => {
  return (params) => Axios.get(url, { params })
}

const _PATCH = (url) => {
  return (body) => Axios.patch(url, body)
}

const _PUT = (url) => {
  return (body) => Axios.put(url, body)
}

module.exports = {
  Axios,
  _GET,
  _POST,
  _PUT,
  _DELETE,
  _PATCH
}
