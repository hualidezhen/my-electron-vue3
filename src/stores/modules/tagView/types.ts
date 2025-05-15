import type { RouteLocationNormalizedLoaded } from 'vue-router'
export interface TagView extends Partial<RouteLocationNormalizedLoaded> {
  title?: string
}
export interface tagState {
  tagViews: Array<TagView>
  cachedViews: Array<string>
  [key: string]: any
}
