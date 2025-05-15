<template>
<div class="app-content">
  <div  class="card">
    <div class="tools">
      <div @click="handleClose" style="-webkit-app-region: drag;" class="circle">
        <span class="red box"></span>
      </div>
      <div  @click="handleMinimize" style="-webkit-app-region: no-drag;"  class="circle">
        <span class="yellow box"></span>
      </div>
      <div @click="handleMaximize" style="-webkit-app-region: no-drag;"  class="circle">
        <span class="green box"></span>
      </div>
    </div>
    <div class="card__content">
    </div>
  </div>
  <div>
    <!-- <index></index> -->
   <!-- <Home></Home> -->
   <!-- <Login></Login> -->

    <n-message-provider>
    <!-- <router-view /> -->
   <!-- <Login></Login> -->
    <RouterView />

  </n-message-provider>

  </div>
</div>
</template>
<script setup>
import index from './components/time/index.vue';
import Home from './components/Home.vue';
import Login from './components/Login.vue';

import {onMounted} from "vue";

const handleClose = () => {
  window.close(); // 关闭窗口
};
const handleMinimize = () => {
  window.electron.minimizeWindow();
};

const handleMaximize = () => {
  window.electron.maximizeWindow();

};
onMounted(() => {
  // document.addEventListener('contextmenu', (event) => {
  //   event.preventDefault(); // 阻止右键菜单的默认行为
  //   window.electron.minimizeWindow(); // 右键点击时最小化窗口
  // });
});
</script>
<style lang="less" scoped>
.app-content{
    		background: #161f27
			url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhBAMAAAClyt9cAAAAJ1BMVEUAAAAAAAAAgP8A//8rqv8r1f8kttszzP83tu08w/82vP82yf////9YRBj1AAAADHRSTlMAAQICBgYHCg4RExP+fJVBAAAAAWJLR0QMgbNRYwAAADRJREFUKM9jYEABrAEMDKMiw1yEsXI6mgh7k0UBQxoyyFZgnsDgggy8DJgnoOlqtijANBkAPzsYSlqP/xIAAAAASUVORK5CYII=')
			repeat;
}

.close-svg {
  z-index: 100;
  position: fixed;
  top: 3px; /* 距离顶部的距离 */
  right: 3px; /* 距离右侧的距离 */
  width: 20px;
  height: 20px;
  display: none; /* 初始状态为隐藏 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
}

.target-element {
  background-color: #555;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
}

.target-element:hover + .close-svg {
  display: block;
}
</style>
<style scoped>
.card {
  position: absolute;
  height: 20px;
  margin: -10px 0 5px 0;
  z-index: 1;
}

.tools {
  display: flex;
  align-items: center;
  padding: 9px;
}

.circle {
  padding: 0 4px;
}

.box {
  display: inline-block;
  align-items: center;
  width: 8px;
  height: 8px;
  padding: 0.5px;
  border-radius: 50%;
}
.red {
  background-color: #ff605c;
}

.yellow {
  background-color: #ffbd44;
}

.green {
  background-color: #00ca4e;
}
</style>
