
<template>
  <div class="container">
    <div class="pdf-preview">
      <div v-if="pdfLoaded" class="pdf-viewer">
        <div v-for="(page, index) in pages" :key="index" class="pdf-page">
          <!-- 使用 :ref 确保每个 canvas 元素引用到 pageRefs 数组中 -->
          <canvas :ref="el => pageRefs[index] = el"></canvas>
        </div>
      </div>
      <div v-else>
        <p>加载中...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watchEffect } from 'vue';
import * as pdfjsLib from 'pdfjs-dist/webpack';

// 配置 PDF.js worker 文件
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;

const pages = ref([]);        // 存储页数
const pageRefs = [];           // 存储每个页的 canvas 引用
const pdfLoaded = ref(false);  // 表示 PDF 是否加载完成

// 预设的 PDF 文件 URL
const pdfUrl = '/2411.02310v1.pdf';

// 组件加载时自动渲染 PDF
onMounted(async () => {
  await renderPDF(pdfUrl);
});

// 使用 watchEffect 监控 pages 数组的变化，确保 canvas 元素已挂载
watchEffect(async () => {
  if (pages.value.length > 0) {
    await renderAllPages();
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
    console.error('PDF 渲染失败:', error);
    alert('无法加载 PDF 文件');
  }
};

// 渲染所有页面到各自的 canvas 上
const renderAllPages = async () => {
  for (let pageNum = 1; pageNum <= pages.value.length; pageNum++) {
    const page = await pdfjsLib.getDocument(pdfUrl).promise.then(pdf => pdf.getPage(pageNum));
    const canvas = pageRefs[pageNum - 1];
    if (!canvas) {
      console.error(`Canvas 元素未找到：页码 ${pageNum}`);
      continue;
    }

    const viewport = page.getViewport({ scale: 1.5 });
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

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
  overflow: hidden;
}

.pdf-viewer {
  width: 100%;
  max-width: 1000px;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 86vh;
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
</style>