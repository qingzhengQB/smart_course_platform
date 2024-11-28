<template>
  <div class="cont">
    <div class="pdf-container">
      <iframe
        :src="fileUrl"
        width="100%"
        height="100%"
        type="application/pdf"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { downLoadCourseResource } from "@/api/CoursePageApi";
import { useRoute } from "vue-router";
const route = useRoute();

// 通过 props 接收父组件传递的 id
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const resourceId = route.params.resourceId; // URL中的资源ID

// 定义响应式变量 fileUrl
const fileUrl = ref("");

// 异步获取资源的函数
const fetchResourceURL = async (resourceId) => {
  try {
    // 调用 API 获取资源 URL
    const response = await downLoadCourseResource(resourceId);
    fileUrl.value = response.URL;
  } catch (error) {
    console.error("获取预览资源失败:", error);
  }
};

// 在组件挂载时调用 fetchResourceURL 获取资源 URL
onMounted(() => {
  fetchResourceURL(resourceId); // 确保传递 id
});
</script>

<style scoped>
.cont {
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
}
.pdf-container {
  margin-top: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: 100%;
}
</style>
