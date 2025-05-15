import { defineStore } from 'pinia'
import pinia from '@/stores'
import type { userState } from './types'
import type { IFormData } from '@/types/views/login/loginInter'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, dropOut } from '@/api/login/user'
import { getCurrentUserInfo } from '@/api/login/user'
import type { IUserInfo } from '../../../types/api/user'
import JSEncrypt from 'jsencrypt'
let publicKey = '-----BEGIN PUBLIC KEY-----' +
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbJjpVA4929To7scL0PyloVqstnG6+xl/SMbX8LeUEL8C1trCX85NJrmOl5j1/lvGpzzcrKwGtDIMCIyon6660TpILQWYn4/M6Td6Jlqzw8ygp8Iv7VlEuhPmBe9voCrLIxbHoM8ngyTuBQICi1y2IOgxl6xC2lgy6Ldxm/+1ZqQIDAQAB' +
    '-----END PUBLIC KEY-----'

const useUserStore = defineStore('user', {
  state: (): userState => ({
    token: getToken(),
    roles: [] as Array<number>,
    currentUserInfo: {} as IUserInfo,
    permissions: [] as Array<string>,
    alarmData: []
    // isLogin:
  }),

  getters: {
    getToken(): string {
      return this.token
    },
    getCurrentUserInfo(): IUserInfo {
      return this.currentUserInfo
    }
  },

  actions: {
    setToken(token: string) {
      this.token = token
    },
    setAlarmData(alarm: any) {
      this.alarmData = alarm
    },
    activeLogin(loginFormData: IFormData) {
      return new Promise((resolve, reject) => {
        const encrypt = new JSEncrypt()
        encrypt.setPublicKey(publicKey)

        const encryptedUsername = encrypt.encrypt(loginFormData.username)
        const encryptedPassword = encrypt.encrypt(loginFormData.password)
        let param = {} as IFormData
        param = { ...loginFormData }
        if (param.password && param.username) {
          param.username = encryptedUsername.toString()
          param.password = encryptedPassword.toString()
          login(param)
            .then((res) => {
              // token保存到cookie

              setToken(res.datas.access_token)
              this.setToken(res.datas.access_token)
              resolve(true)
            })
            .catch((error) => {
              reject(error)
            })
        } else {
          reject(false)
        }
      })
    },
    activeLogout() {
      return new Promise((resolve, reject) => {
        dropOut()
          .then((res) => {
            this.setToken('')
            removeToken()
            this.token = []
            this.currentUserInfo = {}
            this.roles = []
            this.permissions = []
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getInfo() {
      return new Promise((resolve, reject) => {
        getCurrentUserInfo()
          .then((res) => {
            // console.log(res, '***')
            this.currentUserInfo = res.datas
            this.roles = res.datas.roleIds
            this.permissions = res.datas.permissions
            resolve(true)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    resetToken() {
      return new Promise((resolve) => {
        this.token = []
        this.currentUserInfo = {}
        this.roles = []
        this.permissions = []
        removeToken()
        resolve(true)
      })
    }
  }
})

export default useUserStore

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(pinia)
}
