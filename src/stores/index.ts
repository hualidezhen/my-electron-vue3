import { createPinia } from 'pinia'
import useAppStore from './modules/app'
import useTagStore from './modules/tagView'
import useUserStore from './modules/user'

const pinia = createPinia()

export { useAppStore, useTagStore, useUserStore }
export default pinia
