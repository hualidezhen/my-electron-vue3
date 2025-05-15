import type { FormRules } from 'element-plus'

export interface IFormData {
  username: string
  password: string
  grant_type: string
  decrypt_param: string
  account_type?: string
  validCode?: string
  deviceId?: string
}
export interface IFormOption {
  captcha: string
  loading?: boolean
  loginFormData: IFormData
  loginFormRules: FormRules
}
