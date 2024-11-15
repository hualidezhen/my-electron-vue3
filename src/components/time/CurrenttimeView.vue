<template>
  <div class="current-time time_list" style="-webkit-app-region: no-drag;">
    当前时间：{{ formattedDate }} {{ formattedTime }}
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const formattedDate = ref('');
const formattedTime = ref('');

const updateCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  formattedDate.value = `${year}-${month}-${day}`;
  formattedTime.value = `${hours}:${minutes}:${seconds}`;
};

let timeInterval;

onMounted(() => {
  updateCurrentDateTime();
  timeInterval = setInterval(updateCurrentDateTime, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timeInterval);
});
</script>

<style scoped>
.current-time {
  font-size: 14px;
  font-weight: bold;
}
</style>
