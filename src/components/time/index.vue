<template>
  <div class="home-box">

<!--语句-->
<!--    <WeatherChart></WeatherChart>-->
    <TodayView ></TodayView>
    <!--语句-->
   <div class="box-body">

     <WorkView></WorkView>
     <div class="divider"></div>
     <WeekendView></WeekendView>
     <div class="divider"></div>
     <WageView></WageView>
     <div class="divider"></div>
     <YearsView></YearsView>
     <div class="divider"></div>
      <div class="set-box">
        <CurrenttimeView></CurrenttimeView>

      </div>
     <div class="settings">
       <Settings></Settings>
     </div>
     <div class="divider"></div>
<!--     <n-button style="-webkit-app-region: no-drag;" @click="toggleTop" :class="{ active: isTop }">-->
<!--       {{ isTop ? '取消置顶' : '置顶窗口' }}-->
<!--     </n-button>-->
   </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import  WeatherChart from './WeatherChart.vue'
import  TodayView from './TodayView.vue'
import  WorkView from './WorkView.vue'
import  WeekendView from './WeekendView.vue'
import  WageView from './WageView.vue'
import  YearsView from './YearsView.vue'
import  CurrenttimeView from './CurrenttimeView.vue'
import  Settings from './SettingsBtn.vue'

const isTop = ref(true);


onMounted(() => {

});
</script>

<style scoped lang="less">
.home-box {

  color: #000000;
  text-align: left;
  height: calc(94vh - 16px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch; /* 使子元素水平拉伸以填满容器宽度 */
  margin-top: 0 !important;
  padding: 30px 10px 10px;

  /* 添加边框阴影效果 */
  .box-body {
    padding: 10px;
    font-size: 13px;
    margin-top: 10px;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1); /* 调整阴影效果 */
    .divider {
      border-top: 1px solid #e0e0e0; /* 边框颜色可以根据需要调整 */
      margin: 10px 0; /* 上下边距可以根据需要调整 */
    }
    .set-box{
      display: flex;
      justify-content: space-between;
    }
    .settings{
      position: fixed;
      bottom: 10px;
      right: 10px;
    }
  }

}
</style>
