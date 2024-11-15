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
        <!-- 添加 @click 事件来触发发送通知函数 -->
        <el-button type="primary" @click="getNotification">发送</el-button>
      </div>
      <!-- 显示提示信息 -->
      <el-alert
        v-if="message"
        :title="message"
        :type="messageType"
        show-icon
        center
      ></el-alert>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";  // 确保已经导入 ElMessage
import { sendNotification } from "@/api/CoursePageApi"; // 确保API路径正确
import { useStore } from "vuex";
import { useRoute } from 'vue-router';

const route = useRoute();
const courseId = route.params.id;
// 使用 Vuex 获取用户信息
const store = useStore();
const sendForm = ref({
  title: "",
  content: "",
});

const message = ref("");  // 提示信息
const messageType = ref("");  // 提示类型
const userNum = computed(() => store.state.userinfo.userNum); // 获取当前登录用户的编号

// 发送通知函数
const getNotification = async () => {
  console.log("点击发送按钮"); // 调试信息

  // 基本的表单验证
  if (!sendForm.value.title || !sendForm.value.content) {
    ElMessage.error("标题和内容不能为空！");
    return;
  }

  try {
    console.log(sendForm.value);
    // 调用发送通知的 API
    const response = await sendNotification(
      sendForm.value.title,
      sendForm.value.content,
      userNum.value,
      courseId
    );
    console.log("API 响应:", response); // 输出响应数据

    // 处理响应
    if (response.message) {
      message.value = response.message;
      messageType.value = "success";
    } else if (response.error) {
      message.value = response.error;
      messageType.value = "error";
    } else {
      message.value = "未知错误";
      messageType.value = "error";
    }
  } catch (error) {
    console.error("发送通知失败:", error);
    message.value = "服务器错误，请稍后重试";
    messageType.value = "error";
  }
};
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
