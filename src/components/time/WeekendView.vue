<template>
  <div class="time_list" style="-webkit-app-region: no-drag;">距离周末还有 <span class="bold">{{ day }}</span> 天 <span class="bold">{{ hour }}</span> 小时 <span class="bold">{{ minute }}</span> 分 <span class="bold">{{ second }}</span> 秒</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { nextWeekend } from '@/utils/dateUtils'; // 假设你有一个工具函数来计算下一个周末的时间

const day = ref(0);
const hour = ref(0);
const minute = ref(0);
const second = ref(0);

const updateCountdown = () => {
  const now = new Date();
  const weekend = nextWeekend(now);
  const diff = weekend - now;

  if (diff > 0) {
    day.value = Math.floor(diff / (1000 * 60 * 60 * 24));
    hour.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minute.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    second.value = Math.floor((diff % (1000 * 60)) / 1000);
  } else {
    day.value = 0;
    hour.value = 0;
    minute.value = 0;
    second.value = 0;
  }
};

let countdownInterval;

onMounted(() => {
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
});

onBeforeUnmount(() => {
  clearInterval(countdownInterval);
});
</script>

<style scoped lang="less">
.bold {
  font-weight: bold;
}
</style>
