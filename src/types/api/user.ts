
export interface IUserInfo {
  id: number
  userId: number
  mobile: string
  nickname: string
  username: string
  headImgUrl: string
  sex: number
  permissions: Array<string>
  roles: Array<any>
  roleIds: Array<number>
}

export interface IUserModifyPassword {
  id: number | string
  oldPassword: string
  newPassword: string
  checkNewPassword: string
}
