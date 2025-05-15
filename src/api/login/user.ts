import request from '../../utils/request'
import type { IRootInter } from '../../types/api/rootInter'
import type { IFormData } from '../../types/views/login/loginInter'
// import type { ILoginRes } from '../../../types/api/basic/user'
import type { ILoginRes } from '../../types/api/basic/user'
import type { IUserInfo } from '../../types/api/user'

export function login(data: IFormData) {
  return request<IRootInter<ILoginRes>>({
    url: 'api-uaa/oauth/token',
    method: 'post',
    params: data,
    headers: {
      Authorization: 'Basic d2ViQXBwOndlYkFwcA=='
    }
  })
}

// 退出登录接口
export function logout() {
	return request<IRootInter<null>>({
		url: '/api-uaa/oauth/remove/token',
		method: 'post',
		headers: {
			Authorization: 'Basic d2ViQXBwOndlYkFwcA==',
		},
	})
}

// 获取登录验证码
export function getCaptcha(uuid: string) {
  return request<Blob>({
    url: `api-uaa/validata/code/${uuid}`,
    method: 'get',
    responseType: 'blob'
  })
}

// 退出登录
export function dropOut() {
  return request<IRootInter<any>>({
    url: '/api-uaa/oauth/remove/token',
    method: 'post',
    headers: {
      Authorization: 'Basic d2ViQXBwOndlYkFwcA=='
    }
  })
}
// 关于Dms
export function getDmsInfo() {
  return request<IRootInter<any>>({
    url: '/wrcp-dms-back/getDmsInfo',
    method: 'get'
  })
}
// 第三方免登录获取用户名
export function noLogin(data: any, Authorization: any) {
  return request<IRootInter<any>>({
    baseURL: '/noLogin',
    url: 'prod-api/auth/oauth/token',
    method: 'post',
    data: data,
    params: data,
    headers: {
      Authorization: Authorization
    }
  })
}
// 获取字典配置信息
export function dictListData(dictIds: any) {
  return request<IRootInter<any>>({
    url: `/wrcp-dms-back/wrcp-dms-back/dict/data/type/${dictIds}`,
    method: 'get'
  })
}

// 获取当前用户信息
export function getCurrentUserInfo() {
  return request<IRootInter<IUserInfo>>({
    url: '/api-user/users/current',
    method: 'get'
  })
}

