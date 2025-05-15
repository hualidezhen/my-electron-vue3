import Cookies from 'js-cookie'
const TokenKey: string = 'ivigorAuth'
// import { session } from 'electron'

export function getToken(): string | undefined {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

/*export function getToken(): string | null {
  return localStorage.getItem(TokenKey)
}

export function setToken(token: string) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}*/

/*
export function getToken(): string | null {
  // @ts-ignore
  return session.defaultSession.cookies.get({ name: TokenKey })
}

export function setToken(token: string) {
  // @ts-ignore
  return session.defaultSession.cookies.set({ name: TokenKey, value: token })
}

export function removeToken() {
  // @ts-ignore
  return session.defaultSession.cookies.remove({ name: TokenKey })
}
*/
