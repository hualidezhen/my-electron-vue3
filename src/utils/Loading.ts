import { ElLoading } from 'element-plus'
import { ref } from 'vue'

const loading = ref<any>(null)
export function opLoading() {
  const options = {
    lock: true,
    body: true,
    fullscreen: false,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)'
  }
  if (!loading.value) {
    loading.value = ElLoading.service(options)
  }
  overlayZIndex()
}
export function loadingClose() {
  if (loading.value) {
    loading.value.close()
    loading.value = null
  }
}
function overlayZIndex() {
  const arr = document.getElementsByClassName('el-overlay')
  for (let i = 0; i < arr.length; i++) {
    // @ts-ignore
    arr[i].style.zIndex = '999'
  }
}
