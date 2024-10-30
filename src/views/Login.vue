<template>
  <div class="login-container">
    <div ref="vantaRef" class="vantaRef"></div>
    <el-card class="login-card">
      <h1 class="login-title">智慧课程平台</h1>
      <div class="input-container">
        <el-input class="info-input" placeholder="用户名" v-model="username" />
        <el-input class="info-input" type="password" placeholder="密码" v-model="password" />
      </div>
      <el-radio-group class="user-group" v-model="user">
        <el-radio value="student">学生</el-radio>
        <el-radio value="teacher">老师</el-radio>
      </el-radio-group>
      <div class="vartify">
        <el-input placeholder="请输入验证码" class="vartify-input"></el-input>
        <img src="@/assets/LoginAjax.png" />
      </div>
      <el-button class="login-btn" type="primary" @click="handleLogin">
        登 录
      </el-button>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as THREE from "three";
import Clouds from "vanta/src/vanta.clouds";
import loginApi from '../api/LoginApi'; // 导入API文件
import router from "@/router";
import { useStore } from "vuex"; // 导入 useStore

const username = ref("");
const password = ref("");
const user = ref("student");
const vantaRef = ref(null);
let vantaEffect = null;
const store = useStore();
const handleLogin = async () => {
      try {
        const response = await loginApi(username.value, password.value, user.value);
        if (response.success) {
          console.log("Login successful:", response);
          store.dispatch('updateUserNum', username.value); // 更新 Vuex store 中的用户信息
          router.push('/'); // 跳转到主页面
        } else {
          console.error("Login failed:", response.message);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

onMounted(() => {
  vantaEffect = Clouds({
    el: vantaRef.value,
    THREE: THREE,
    backgroundColor: 0xffffff,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    skyColor: 0x95cae0,
    cloudColor: 0xb2b2cc,
    cloudShadowColor: 0x36495b,
    sunColor: 0x68471b,
    sunGlareColor: 0xbb7964,
    sunlightColor: 0x474747,
    speed: 2.1,
  });
});

onBeforeUnmount(() => {
  if (vantaEffect) vantaEffect.destroy();
});


</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: relative;
}

.vantaRef {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1; /* 确保它在其他内容后面 */
}

.login-card {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 40vw;
  height: 50vh;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.1); /* 使登录框半透明 */
  z-index: 1; /* 确保它在Vanta背景前面 */
}
.login-title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}
.info-input {
  margin: 10px 0;
  height: 40px;
}

.user-group {
  margin: 10px 0;
}

.vartify {
  display: flex;
  justify-content: space-between;
}

.vartify-input {
  height: 40px;
  margin-right: 50px;
}

.vartify img {
  height: 40px;
}

.login-btn {
  width: 100%;
  margin: 20px 0;
  height: 35px;
  font-size: 20px;
}
</style>
