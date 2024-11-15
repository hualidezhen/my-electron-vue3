<template>
  <div class="time_list" style="-webkit-app-region: no-drag;">距离下班还有 <span class="bold">{{ hour }}</span> 小时 <span class="bold">{{ minute }}</span> 分 <span class="bold">{{ second }}</span> 秒</div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue';

// 定义响应式变量
const day = ref(0);
const hour = ref(0);
const minute = ref(0);
const second = ref(0);

// 计算剩余时间的函数
const calculateTimeLeft = () => {
  const now = new Date();
  const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 18, 0, 0);

  if (now >= targetTime) {
    // 如果当前时间已经过了 18:00，则计算到第二天的 18:00
    targetTime.setDate(targetTime.getDate() + 1);
  }

  const timeDifference = targetTime.getTime() - now.getTime();

  day.value = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  hour.value = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minute.value = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  second.value = Math.floor((timeDifference % (1000 * 60)) / 1000);
};

// 每秒更新一次时间
let timerId;

onMounted(() => {
  calculateTimeLeft();
  timerId = setInterval(calculateTimeLeft, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timerId);
});
</script>

<style scoped lang="less">
.bold {
  font-weight: bold;
}

</style>

