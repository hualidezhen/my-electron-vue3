<template>
  <div class="login">
    <div>
      <div class="login-title">
        <div class="fs-14">深圳市行健自动化股份有限公司</div>
      </div>
      <div class="login-container">
        <n-form
          ref="formRef"
          class="custom-n-form"
          :model="model"
          :rules="rules"
          size="small"
          :show-label="false"
        >
          <n-form-item path="userName">
            <n-input
              v-model:value="model.userName"
              placeholder="请输入用户名"
              @keydown.enter.prevent
            >
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="model.password"
              type="password"
              placeholder="请输入密码"
              @input="handlePasswordInput"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-form-item
            ref="rPasswordFormItemRef"
            first
            path="reenteredPassword"
          >
            <n-input
              v-model:value="model.reenteredPassword"
              :disabled="!model.password"
              type="password"
              placeholder="请输入重复密码"
              @keydown.enter.prevent
            />
          </n-form-item>
          <n-row :gutter="[0, 24]">
            <n-col :span="24">
              <div style="display: flex; justify-content: flex-end">
                <n-button
                  style="width: 100%"
                  :disabled="model.userName === null"
                  ghost
                  type="info"
                  @click="handleValidateButtonClick"
                >
                  登 录
                </n-button>
              </div>
            </n-col>
          </n-row>
        </n-form>
        <div class="sub-title">
          <p>深圳市行健自动化股份有限公司2025©版权所有</p>
        </div>
      </div>
      <div class="rotating-plane"></div>
    </div>
  </div>
</template>

<script lang="ts">
import type { FormInst, FormItemInst, FormItemRule, FormRules } from "naive-ui";
import { useMessage } from "naive-ui";
import { defineComponent, ref } from "vue";
// import { FlashOutline } from '@vicons/ionicons5'
// import { useUserStore, useAppStore } from "@/stores";
import type { IFormData } from "@/types/views/login/loginInter";
import JSEncrypt from "jsencrypt";
import { login } from "@/api/login/user";
import { useRouter, useRoute } from "vue-router";

interface ModelType {
  userName: string | null;
  password: string | null;
  reenteredPassword: string | null;
}

export default defineComponent({
  setup() {
    const formRef = ref<FormInst | null>(null);
    const rPasswordFormItemRef = ref<FormItemInst | null>(null);
    const message = useMessage();
    const router = useRouter();
    const route = useRoute();
    const publicKey =
      "-----BEGIN PUBLIC KEY-----" +
      "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbJjpVA4929To7scL0PyloVqstnG6+xl/SMbX8LeUEL8C1trCX85NJrmOl5j1/lvGpzzcrKwGtDIMCIyon6660TpILQWYn4/M6Td6Jlqzw8ygp8Iv7VlEuhPmBe9voCrLIxbHoM8ngyTuBQICi1y2IOgxl6xC2lgy6Ldxm/+1ZqQIDAQAB" +
      "-----END PUBLIC KEY-----";
    // const userStore = useUserStore();

    const modelRef = ref<ModelType>({
      userName: null,
      password: null,
      reenteredPassword: null,
    });
    function validatePasswordStartWith(
      rule: FormItemRule,
      value: string
    ): boolean {
      return (
        !!modelRef.value.password &&
        modelRef.value.password.startsWith(value) &&
        modelRef.value.password.length >= value.length
      );
    }
    function validatePasswordSame(rule: FormItemRule, value: string): boolean {
      return value === modelRef.value.password;
    }
    const rules: FormRules = {
      userName: [
        {
          required: true,
          validator(rule: FormItemRule, value: string) {
            if (!value) {
              return new Error("请输入用户名");
            }
            return true;
          },
          trigger: ["input", "blur"],
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
        },
      ],
      reenteredPassword: [
        {
          required: true,
          message: "请再次输入密码",
          trigger: ["input", "blur"],
        },
        {
          validator: validatePasswordStartWith,
          message: "两次密码输入不一致",
          trigger: "input",
        },
        {
          validator: validatePasswordSame,
          message: "两次密码输入不一致",
          trigger: ["blur", "password-input"],
        },
      ],
    };
    return {
      formRef,
      rPasswordFormItemRef,
      model: modelRef,
      rules,
      handlePasswordInput() {
        if (modelRef.value.reenteredPassword) {
          rPasswordFormItemRef.value?.validate({ trigger: "password-input" });
        }
      },

      async handleValidateButtonClick(e: MouseEvent) {
        e.preventDefault();
        try {
          console.log(1);

          // const errors = await formRef.value?.validate();
          if (true) {
            console.log(2);
            const encrypt = new JSEncrypt();
            encrypt.setPublicKey(publicKey);

            const encryptedUsername = encrypt.encrypt(
              modelRef.value.userName || ""
            );
            const encryptedPassword = encrypt.encrypt(
              modelRef.value.password || ""
            );
            console.log(3);

            if (encryptedUsername && encryptedPassword) {
              console.log(4);
              const params: IFormData = {
                username: encryptedUsername,
                password: encryptedPassword,
                grant_type: "password",
                decrypt_param: "username;password",
              };

              await login(params);
              // Handle successful login, e.g., save token, redirect, etc.
              message.success("登录成功");
              router.push({ path: "/time" });
            } else {
              throw new Error("加密失败");
            }
          }
        } catch (error) {
          console.error(error);
          message.error("验证失败，请检查输入");
        }
      },
    };
  },
});
</script>

<style scoped lang="scss">
.login {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background: #01222e url("@/assets/image/login/login-bg.png") no-repeat 50% 50%;
  background-size: cover;

  .login-title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 383.25px;
    height: 51px;
    padding: 0px 15px;
    background: url("@/assets/image/login/login-title.png") no-repeat 50% 50%;
    background-size: cover;

    > div {
      line-height: 68px;
      color: #ffffff;
    }
  }

  .login-container {
    gap: 60px;
    width: 383.25px;
    height: 309px;
    padding: 15px;
    background: url("@/assets/image/login/login-form.png") no-repeat 50% 50%;
    background-size: cover;
    // text-align: center;
    // display: flex;
    // justify-content: center;

    .sub-title {
      text-align: center;
      font-size: 14px;
      color: #333333;
    }

    .custom-n-form {
      width: 250px;
      margin: 50px auto 0px;
    }

    .demo-rule-form {
      width: 70%;

      .el-button {
        margin: 0;
      }
    }

    &.effect {
      // 添加动态效果
      animation: login-small 0.8s linear;
      animation-fill-mode: forwards;
    }

    h3 {
      margin-bottom: 25px;
      font-size: 24px;
      text-align: center;

      // font-style: italic;
    }
  }

  .rotating-plane {
    position: absolute;
    top: 50%;
    left: 50%;
    display: none;
    width: 80px;
    height: 80px;
    margin-top: -40px;

    // transform: translate(-50%,-50%);
    margin-left: -40px;
    background: linear-gradient(to right, #467e85, #e5e6d5);
    animation: rotating-plane 2s infinite;

    &.active {
      display: block;
    }
  }
}

:deep(.n-input) {
  background: none !important;
  border-width: 0px;

  .n-input__input-el {
    color: #9ccaf7;
  }
  .n-input__border {
    border-color: rgba($color: #389ee2, $alpha: 0.5);
  }

  .n-input-wrapper {
    border-width: 0px;
    .n-input__input {
      .n-input__placeholder {
        font-size: 12px;
        color: rgba($color: #ffffff, $alpha: 0.5);
      }
    }
  }
}

:deep(.n-button) {
  .n-button__content {
    color: #ffffff;
  }
}

.display-none {
  display: none;
}

// 定义动画
@keyframes login-small {
  0% {
    // 位移 translate， 放大缩小 scale: ;
    transform: translate(-50%, -50%) scale(1);
  }

  100% {
    transform: translate(-50%, -50%) scale(0.2);
  }
}

@keyframes rotating-plane {
  0% {
    transform: rotateX(0deg) rotateY(0);
  }

  50% {
    transform: rotateX(-180deg) rotateY(0);
  }

  100% {
    transform: rotateX(-180deg) rotateY(180deg);
  }
}
</style>
