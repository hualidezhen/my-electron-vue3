<template>
  <div class="card-container">
    <div class="card">
      <p class="card__content">是否退出登录</p>
      <n-button  class='cancel' tertiary style="margin-right: 20px" @click="cancelClick">
        取消
      </n-button>
      <n-button type="info" class='confirm' tertiary  @click="confirmClick"> 确认 </n-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { logout } from "@/api/login/user";
import { useMessage } from "naive-ui";
import { useRouter } from "vue-router";

export default defineComponent({
  emits: ['refresh'],
  setup(_, { emit }) {
    const message = useMessage();
    const router = useRouter();

    // 取消
    const cancelClick = () => {
      console.log('取消')
      message.info('已取消');
      emit('refresh', false);
    };
    // 确认
    const confirmClick = async () => {
      await logout();
      message.success("退出成功");
      router.push({ path: "/login" });
    };
    return {
      cancelClick,
      confirmClick,
    };
  },
});
</script>

<style scoped>
.card-container{
  position: absolute;
    top: -200px;
    right: 200px;
    width: 200px;
    background-color: #ccc;
    padding: 10px;
    border-radius: 5px;

 
}

   .cancel{
      
    }

    .confirm{

    }
</style>