import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import type { RouteRecordRaw } from 'vue-router'
import type { AppState } from './types'
import pinia from '@/stores'

const useAppStore = defineStore('app', {
  state: (): AppState => ({
    routes: [],
    screenWidth: 0,
    screenHeight: 0,
    syStemInfo: {} as any
  }),

  getters: {
    getRoutes(): Array<RouteRecordRaw> {
      return this.routes
    }
  },

  actions: {
    setIsLoading(flag: boolean) {
      this.isLoading = flag
    },
    setRoutes(routes: RouteRecordRaw[]) {
      this.routes = routes
    },

    filterRoutes(routes: Array<RouteRecordRaw>, value: string) {
      let filterRoutes = routes.find((item) => item.path === value)
      if (filterRoutes !== undefined && filterRoutes.children !== undefined && filterRoutes.children.length > 0) {
        return filterRoutes.children
      } else {
        return []
      }
    },
    toggleTheme(theme: string) {
      document.body.classList.remove(this.theme)
      document.body.removeAttribute(this.theme)
      document.body.setAttribute('arco-theme', theme)
      document.body.classList.add(theme)
      this.theme = theme
      Cookies.set('theme', theme)
      this.themeLists.map((item: any) => {
        if (item.name === theme) {
          item.value = true
        } else {
          item.value = false
        }
        return item
      })
    },
    toggleSideBar(Collapse: boolean) {
      this.sidebarOpen = Collapse ? false : true
      if (this.sidebarOpen) {
        Cookies.set('sidebarOpen', '1')
      } else {
        Cookies.set('sidebarOpen', '0')
      }
    },
    toggleSideConditionBar(Collapse: boolean) {
      this.sideConditionOpen = Collapse ? false : true
      if (this.sideConditionOpen) {
        Cookies.set('sideConditionOpen', '1')
      } else {
        Cookies.set('sideConditionOpen', '0')
      }
    },
    setScreenWidth(width: number) {
      this.screenWidth = width
    },
    setScreenHeight(height: number) {
      this.screenHeight = height
    }
  }
})

export default useAppStore

export function useAppStoreWidthOut() {
  return useAppStore(pinia)
}
