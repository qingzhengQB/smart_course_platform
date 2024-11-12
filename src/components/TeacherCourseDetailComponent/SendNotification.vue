<template>
  <div class="send-container">
    <div class="send-content-container">
      <span class="notification-title">发送通知</span>
      <span class="content-title">通知标题</span>
      <el-input
        class="title-input"
        type="textarea"
        v-model="sendForm.title"
        :rows="2"
      ></el-input>
      <span class="content-title">通知内容</span>
      <el-input
        class="content-input"
        type="textarea"
        v-model="sendForm.content"
        :rows="10"
      ></el-input>
      <div class="option-container">
        <el-button type="primary" @click="sendNotification">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const sendForm = ref({
  title: "",
  content: "",
});
</script>

<style lang="scss" scoped>
.send-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-input {
  margin: 5px 0;
}
.send-content-container {
  display: flex;
  flex-direction: column;
  width: 85%;
  height: 90%;
}
.notification-title {
  font-size: 1.5rem;
  font-weight: bolder;
  color: var(--menu-color-hover);
  margin: 15px 0;
}
.content-title {
  margin: 15px 0;
}
.option-container {
  margin: 15px 0;
  margin-left: auto;
  height: 8%;
  width: 15%;
}
.option-container .el-button {
  width: 100%;
  height: 90%;
  font-size: 1.2rem;
  font-weight: bolder;
}
</style>

<style>
.title-input .el-textarea__inner {
  font-family: "Microsoft" !important;
  font-size: 18px !important;
}
.content-input .el-textarea__inner {
  font-family: "Microsoft" !important;
  font-size: 15px !important;
}
</style>
