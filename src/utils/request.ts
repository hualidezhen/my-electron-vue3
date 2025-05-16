import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStoreWidthOut } from '@/stores/modules/user'
import { useAppStoreWidthOut } from '@/stores/modules/app'
import { getToken, removeToken } from './auth'
import { loadingClose, opLoading } from './Loading'
import { ref } from 'vue'
const whiteList = ['getTrueRelease', 'validata/code', 'getEmpowerStatus', 'oauth/token']
// let baseUrl = '/dev-api'
// if (import.meta.env.VITE_API_BASEURL) {
//   baseUrl = import.meta.env.VITE_API_BASEURL
// }

const baseUrl = 'http://192.168.100.218:9900';
const request = axios.create({
  baseURL: baseUrl,
  // baseURL: 'http://192.168.100.218:9900',
  timeout: 60000
})
const loading = ref()
let requestCount = ref(0) // 用于跟踪请求数量的计数器
// 添加请求拦截器
request.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    //const userStore = useUserStoreWidthOut()
    const AppStore = useAppStoreWidthOut()
    const hasToken = getToken()
    requestCount.value++
    // 在发送请求之前做些什么
    // 统一设置用户身份 token
    if (hasToken) {
      if (AppStore.isLoading) {
        opLoading()
      }
      let isFlag = false
      whiteList.forEach((item) => {
        if (config.url?.indexOf(item) !== -1) {
          isFlag = true
        }
      })
      if (!isFlag) {
        if (!config.headers!.Authorization) {
          // @ts-ignore
          config.headers!.Authorization = 'Bearer ' + getToken()
        }
      }
    } else {
      removeToken()
      loading.value?.close()
    }

    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

function errorToLogin() {
  const hasToken = getToken()
  // let origin = import.meta.env.VITE_electron ? import.meta.env.VITE_ws_api : window.location.origin
  // let pathname = import.meta.env.VITE_electron ? import.meta.env.VITE_ws_api : window.location.pathname
 let origin =  '192.168.100.218:9900'
 let pathname =  '192.168.100.218:9900'
  
  if (hasToken) {
    removeToken()
    const userStore = useUserStoreWidthOut()
    //let hash = window.location.hash
    userStore.activeLogout().then(() => {
      //ElMessage.success(res.resp_msg)
      //ElMessage.success('系统退出成功！')

      if (window.location.href.indexOf('login') === -1) {
        /* if (hash.indexOf('#') !== -1) {
        hash = hash.slice(hash.indexOf('#') + 1)
      }
      window.location.href = origin + `/login?redirect=${window.location.hash}` */
        window.location.href = origin + pathname + `#/login`
      }
      if (loading.value) {
        loading.value.close()
      }
    })
  } else {
    if (window.location.href.indexOf('login') === -1) {
      /* if (hash.indexOf('#') !== -1) {
      hash = hash.slice(hash.indexOf('#') + 1)
    }
    window.location.href = origin + `/login?redirect=${window.location.hash}` */
      window.location.href = origin + pathname + `#/login`
    }
    loading.value?.close()
  }
}

// 添加响应拦截器
request.interceptors.response.use(
  function (response: AxiosResponse) {
    // 对响应数据做点什么
    // 统一处理接口响应错误
    requestCount.value--
    if (requestCount.value === 0) {
      loadingClose() // 只有在计数器归零时，才关闭loading状态
    }
    const res = response.data
    if (res.resp_code !== 200 && res.resp_code !== undefined) {
      console.log(res, '响应码状态非200')
      loadingClose()
      if (res.resp_code !== 100 && res.resp_code !== 401) {
        ElMessage({
          type: 'error',
          dangerouslyUseHTMLString: true,
          message: res.resp_msg || '响应码状态非200'
        })
        // ElMessage.error(res.resp_msg || '响应码状态非200')
      }
      // if (res.resp_code === 400 || res.resp_code === 401) {
      //   errorToLogin()
      // }
      if (res.resp_code === 401) {
        console.log(res, '错误信息')
        errorToLogin()
      }
      return Promise.reject(res)
    }
    return response
  },
  function (error) {
    console.log(error.response, '错误信息')
    // 对响应错误做点什么
    //console.log(error)
    requestCount.value-- // 每次响应失败时，计数器减一
    if (requestCount.value === 0) {
      loadingClose() // 只有在计数器归零时，才关闭loading状态
    }
    const resError = error.response
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error' || error.message.includes('timeout')) {
      ElMessage.error('请求超时，请稍后重试')
    }
    if (error && resError) {
      loading.value?.close()
      if (resError.status === 401 || resError.status === 400) {
        if (resError.status === 401) {
          console.log(resError.data.resp_msg, '权限不足')
          //ElMessage.error(resError.data.resp_msg)
          // 删除token重定向到登录页面...
          //window.location.href = '/'
          //console.log(window.location)
          errorToLogin()
        } else {
          if (resError.resp_code !== 100 && resError.resp_code !== 401) {
            ElMessage.error(resError.data.resp_msg || resError.statusText)
          }
          // errorToLogin()
        }
      } else {
        loading.value?.close()
        if (resError.resp_code !== 100 && resError.resp_code !== 401) {
          ElMessage.error(resError.data.resp_msg || resError.statusText)
        }
      }
    }
    return Promise.reject(error)
  }
)

export default <T>(config: AxiosRequestConfig) => {
  return request(config).then((res) => {
    return res.data as T
  })
}
