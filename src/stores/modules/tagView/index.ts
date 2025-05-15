import { defineStore } from 'pinia'
import type { tagState, TagView } from './types'

const useTagStore = defineStore('tag', {
  state: (): tagState => ({
    tagViews: [],
    cachedViews: []
  }),

  getters: {},

  actions: {
    setTagViews(view: TagView) {
      if (this.tagViews.some((v: TagView) => v.path === view.path)) {
        return
      }
      this.tagViews.push(
        Object.assign({}, view, {
          title: view.meta?.title || 'no-name'
        })
      )
      this.setTagViewsCached(view)
    },
    setTagViewsCached(view: TagView) {
      if (view.name && this.cachedViews.includes(view.name.toString())) {
        return
      }
      if (view.name && view.meta?.cache) {
        this.cachedViews.push(view.name.toString())
      }
    },
    updateTagViews(view: TagView) {
      for (let v of this.tagViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    },
    delTagViews(view: TagView) {
      for (const [i, v] of this.tagViews.entries()) {
        if (v.path === view.path) {
          this.tagViews.splice(i, 1)
          this.delTagViewsCached(view)
          break
        }
      }
    },
    delTagViewsCached(view: TagView) {
      if (view.name) {
        const index = this.cachedViews.indexOf(view.name.toString())
        index > -1 && this.cachedViews.splice(index, 1)
      }
    },
    delOtherTagViews(view: TagView) {
      this.tagViews = this.tagViews.filter((v) => {
        return v.meta?.affix || v.path === view.path
      })
    },
    delOtherTagViewsCached(view: TagView) {
      if (view.name) {
        const index = this.cachedViews.indexOf(view.name.toString())
        if (index > -1) {
          this.cachedViews = this.cachedViews.slice(index, index + 1)
        } else {
          // if index = -1, there is no cached tags
          this.cachedViews = []
        }
      }
    },
    delALLTagViews() {
      const affixTags = this.tagViews.filter((tag) => tag.meta?.affix)
      this.tagViews = affixTags
    },
    delALLTagViewsCached() {
      this.cachedViews = []
    }
  }
})

export default useTagStore
