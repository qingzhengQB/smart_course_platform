<template>
    <div class="cont">
      <div class="pdf-container">
        <iframe :src="pdfUrl" width="100%" height="100%" type="application/pdf"></iframe>
      </div>
    </div>
  </template>
  
  <script>


  export default {
    props: {
      id: {
        type: String,
        required: true,
      },
    },
    computed: {
      pdfUrl() {
        // 假设所有文件都指向相同的 PDF 文件路径
        return "/2411.02310v1.pdf";
      },
    },
  };
  </script>
  
  <style scoped>
  .cont{
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