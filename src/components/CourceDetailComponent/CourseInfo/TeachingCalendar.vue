<template>
  <div class="container">
    <div class="pdf-preview">
      <!-- PDF 渲染区域，包含所有页面 -->
      <div v-if="pdfLoaded">
        <div
          :class="['pdf-viewer', { 'pdf-previewr-teacher': isTeacher }]"
        >
          <div v-for="(page, index) in pages" :key="index" class="pdf-page">
            <!-- 使用 :ref 确保每个 canvas 元素引用到 pageRefs 数组中 -->
            <canvas :ref="(el) => (pageRefs[index] = el)"></canvas>
          </div>
        </div>
      </div>
      <div v-else>
        <p>加载中...</p>
      </div>
    </div>
    
    <div v-if="isTeacher" class="upload-file-container">
      <div class="upload-file">
        <el-upload
          v-model:file-list="fileList"
          class="upload-files"
          :action="uploadUrl"
          :limit="1"
          :on-success="handleUploadSuccess"
        >
          <el-button type="primary">上传文件</el-button>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import * as pdfjsLib from "pdfjs-dist/webpack";
import { getCourseCalendar } from "@/api/CoursePageApi";
import { useRoute } from 'vue-router';

const isTeacher = ref(window.location.pathname.startsWith("/teacher-course/"));
const route = useRoute();
const courseId = route.params.id;

// 配置 PDF.js worker 文件
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;

const pages = ref([]); // 存储页数
const pageRefs = []; // 存储每个页的 canvas 引用
const pdfLoaded = ref(false); // 表示 PDF 是否加载完成

// 预设的 PDF 文件 URL
const pdfUrl = ref(""); // 使用 ref 来存储 pdfUrl，以保证响应式更新
// 动态生成上传文件的 URL
const uploadUrl = ref(`http://localhost:8000/teacher/course/${courseId}/uploadCourseCalendar`);

// 获取课程日历 URL
const fetchCourseCalendarUrl = async () => {
  try {
    const response = await getCourseCalendar(courseId);
    pdfUrl.value = response.URL; // 更新为响应式变量
  } catch (error) {
    console.error("日历表url获取失败", error);
  }
};

// 上传成功后的处理函数
const handleUploadSuccess = async () => {
  // 上传成功后，重新获取课程日历并重新渲染 PDF
  await fetchCourseCalendarUrl();
  renderPDF(pdfUrl.value); // 重新渲染 PDF 文件
};

// 组件加载时自动渲染 PDF
onMounted(async () => {
  await fetchCourseCalendarUrl();
  if (pdfUrl.value) {
    await renderPDF(pdfUrl.value); // 确保传入的 URL 是最新的
  }
});

// 使用 watchEffect 监控 pages 数组的变化，确保 canvas 元素已挂载
watchEffect(async () => {
  if (pages.value.length > 0) {
    await renderAllPages(); // 渲染所有页面
  }
});

// PDF 渲染函数：加载 PDF 并创建页面列表
const renderPDF = async (url) => {
  try {
    pdfLoaded.value = false;
    pages.value = []; // 重置页面

    // 获取 PDF 文档
    const pdf = await pdfjsLib.getDocument(url).promise;

    // 将页面编号添加到 pages 数组，以便触发渲染
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      pages.value.push(pageNum);
    }

    pdfLoaded.value = true; // 设置加载完成标记
  } catch (error) {
    console.error("PDF 渲染失败:", error);
    alert("无法加载 PDF 文件");
  }
};

// 渲染所有页面到各自的 canvas 上
const renderAllPages = async () => {
  const pdf = await pdfjsLib.getDocument(pdfUrl.value).promise; // 获取最新的 PDF 文件
  for (let pageNum = 1; pageNum <= pages.value.length; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const canvas = pageRefs[pageNum - 1];
    if (!canvas) {
      console.error(`Canvas 元素未找到：页码 ${pageNum}`);
      continue;
    }

    const viewport = page.getViewport({ scale: 1.5 });
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    // 渲染每个页面到独立的 canvas 上
    await page.render(renderContext).promise;
  }
};
</script>

<style scoped>
.container {
  box-sizing: border-box;
  height: auto;
  overflow-y: hidden;
}

.pdf-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  height: 100%;
}

.pdf-viewer {
  width: 100%;
  max-width: 1000px;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 87vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.pdf-page {
  margin-bottom: 20px;
}

canvas {
  width: 100%;
  border: 1px solid #ccc;
}

.pdf-previewr-teacher {
  height: 80vh;
}

.upload-file-container {
  width: 75vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 15px;
}


.el-upload {
  margin-left: auto;
}
</style>
