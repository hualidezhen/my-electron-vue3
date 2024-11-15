<template>
  <div class="box"  style="width: 100%;">
    <div @click="fetchOneData" class="scrollbar-text" ref="scrollbarText">
      <span class="light-text">今天是 </span>
      <span class="light-week"> {{ currentDay }} , </span>
      <span>{{ oneData }}</span>
    </div>
  </div>
</template>

<script setup>
import {getDayOfWeek} from '@/utils/dateUtils'; // 日期函数
import {onMounted, ref} from 'vue';

const currentDay = ref('');
const oneData = ref('');
const scrollbarText = ref(null);

const fetchOneData = async () => {
  try {
    const response = await fetch('https://api.t1qq.com/api/tool/daytry?key=WS2vrIC16AlMZsjRab3AcE4YxEa&time=random');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    oneData.value = data.data.note;
    startAutoScroll();
  } catch (error) {
    console.error('Error fetching One data:', error);
  }
};

const startAutoScroll = () => {
  if (scrollbarText.value) {
    const scrollWidth = scrollbarText.value.scrollWidth;
    const clientWidth = scrollbarText.value.clientWidth;
    if (scrollWidth > clientWidth) {
      let scrollPosition = 0;
      const interval = setInterval(() => {
        scrollPosition += 1;
        if (scrollPosition >= scrollWidth) {
          scrollPosition = 0;
        }
        scrollbarText.value.scrollLeft = scrollPosition;
      }, 30); // 每30毫秒滚动一次

      // 清除定时器
      const stopScroll = () => {
        clearInterval(interval);
      };

      // 监听鼠标进入和离开事件
      scrollbarText.value.addEventListener('mouseenter', stopScroll);
      scrollbarText.value.addEventListener('mouseleave', () => {
        startAutoScroll();
      });
    }
  }
};

onMounted(() => {
  currentDay.value = getDayOfWeek(); // 获取周几
  fetchOneData(); // 获取每日语录
});
</script>

<style scoped lang="less">
.box{


.n-scrollbar {
  width: 100%;
}

.scrollbar-text {
  font-size: 10px;
  -webkit-app-region: no-drag;
  white-space: nowrap;
  padding: 5px;
  background-color: #ddeafe;
  border-radius: 4px;
  overflow-x: hidden; /* 隐藏水平滚动条 */
  position: relative; /* 使伪元素定位生效 */

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px; /* 左侧列的宽度 */
    height: 100%;
    background-color: #3864ed; /* 悬停时的背景颜色 */
  }

  &:hover {
    cursor: pointer; /* 改变鼠标指针为手形 */
  }
}

.light-text {
  font-weight: 300; /* 设置字体较细 */
  padding-left: 5px;
}

.light-week {
  font-weight: bold; /* 设置所有字体加粗 */
}
}
</style>
