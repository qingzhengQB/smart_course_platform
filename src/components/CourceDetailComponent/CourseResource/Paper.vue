<template>
  <div class="con">
    <table class="file-table">
      <thead>
        <tr>
          <th>文件名称</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(file, index) in files" :key="index">
          <td style="padding-left: 30px">
            <a @click.prevent="goToPreview(file.id)" href="#">{{
              file.name
            }}</a>
          </td>
          <td
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              gap: 20px;
            "
          >
            <a href="#" @click.stop="downloadFile(file.id)">下载</a>
            <a href="#" @click.stop="deleteFile(file.id)">删除</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="upload-resource-container" v-if="isTeacher">
    <div class="upload-resource">
      <el-upload
        v-model:file-list="fileList"
        class="upload-files"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :limit="1"
        ><el-button type="primary">上传文件</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTeacher: window.location.pathname.startsWith("/teacher-course/"),
      files: [{ id: "1", name: "试卷一" }],
    };
  },
  methods: {
    goToPreview(fileId) {
      this.$router.push({
        name: this.$store.getters.getIsTeacher ? "teacher-preview" : "preview",
        params: { resourceId: fileId },
      });
    },
    deleteFile(id) {
      // 在这里实现文件删除逻辑
      alert(`删除文件 ID: ${id}`);
    },
    downloadFile(id) {
      // 在这里实现文件下载逻辑
      alert(`下载文件 ID: ${id}`);

      const fileUrl = "/2411.02310v1.pdf";

      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = `文件${id}.pdf`;
      link.style.display = "none";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>

<style scoped>
.con {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.file-table {
  width: 92%;
  border-collapse: collapse;
}

.file-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.file-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.file-table tr:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}

.icon-settings {
  color: #131314;
  font-size: 18px;
}

.file-table a {
  color: #151516;
  text-decoration: none;
}

.file-table a:hover {
  text-decoration: underline;
}
.upload-resource-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
}
.upload-resource {
  margin: 0 5vw;
}
</style>
