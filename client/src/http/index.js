import axios from 'axios'
import packageConfig from '../../package.json'

const sysVersion = packageConfig.version

const Axios = axios.create({
  baseURL: '/v1',
  timeout: 30000,
  withCredentials: true,
  responseType: 'json',
  // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default
  // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
  xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的
  headers: {
    'Content-Type': 'application/json',
    '_version': sysVersion
  }
})

// 当前时间未得到响应的http请求集合
const requestMap = {}

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
  alert('请检查网络1')
  return Promise.reject(thrown)
})

// 响应拦截器
Axios.interceptors.response.use(res => {
  // 统一对返回的数据做JSON转换
  try {
    res.config.data = JSON.parse(res.config.data)
  } catch (err) {
    res.config.data = {}
  }

  // delete current request in the map
  if (requestMap[getUniqueIdentifies(res.config)]) {
    console.log(`url为${res.config.url}的请求已经完成`)
    delete requestMap[getUniqueIdentifies(res.config)]
  }

  // PHP封装返回错误信息
  if (skipState.indexOf(res.data.state) === -1) {
    switch (res.data.level) {
      case 1:
        alert(res.data.msg)
        break
      default:
        alert(res.data.msg)
        break
    }
  }

  return res.data
}, thrown => {
  if (axios.isCancel(thrown)) {
    // console.log('Request canceled', thrown.message)
  } else {
    alert('请检查网络2')
  }
  return Promise.reject(thrown)
})

function getUniqueIdentifies (config) {
  return escape(`${config.method}-${config.url.replace(config.baseURL, '')}-${JSON.stringify(config.params)}-${typeof config.data === 'string' ? config.data : JSON.stringify(config.data)}`)
}

Axios.install = Vue => {
  Object.defineProperty(Vue.prototype, '$axios', {
    get () {
      return Axios
    }
  })
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

export default Axios

export {
  _GET,
  _POST,
  _PUT,
  _DELETE,
  _PATCH
}
