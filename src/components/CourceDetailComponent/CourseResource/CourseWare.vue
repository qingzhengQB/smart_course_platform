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
              file.fileName
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
            <a v-if="isTeacher" href="#" @click.stop="deleteFile(file.id)">删除</a>
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
        :action="uploadUrl"
        :data="uploadData"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-change="handleChange"
        :before-upload="beforeUpload"
        method="post"
        :limit="10"
        multiple
      >
        <el-button type="primary">上传文件</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script setup>
import {
  getCourseWareList,
  downLoadCourseResource,
  deleteCourseResource,
} from "@/api/CoursePageApi";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();

// 获取路由信息
const route = useRoute();
const router = useRouter();
const courseId = route.params.id;

// 检查是否为教师
const isTeacher = ref(window.location.pathname.startsWith("/teacher-course/"));

// 文件列表
const files = ref([]);
const fileList = ref([]);
const loading = ref(false);
// 上传数据配置，通过接口"http://localhost:8000/teacher/course/" + courseId + "/uploadResource"
const uploadUrl =
  "http://localhost:8000/teacher/course/" + courseId + "/uploadResource"; // 后端上传接口
const uploadData = ref({
  courseId: courseId, // 传递课程 ID
});

// 预览文件
const goToPreview = (fileId) => {
  router.push({
    name: store.getters.getIsTeacher ? "teacher-preview" : "preview",
    params: { resourceId: fileId },
  });
};

// 下载文件
const downloadFile = async (id) => {
  alert(`下载文件 ID: ${id}`);

  try {
    // 获取文件 URL 和文件类型
    const response = await downLoadCourseResource(id);
    const fileUrl = response.URL;
    const fileType = response.fileType;

    let fileExtension = "unknown";
    switch (fileType) {
      case "application/pdf":
        fileExtension = "pdf";
        break;
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        fileExtension = "pptx";
        break;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        fileExtension = "docx";
        break;
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        fileExtension = "xlsx";
        break;
      default:
        fileExtension = "bin"; // 默认二进制文件
    }

    if (!fileUrl) {
      throw new Error("文件 URL 无效。");
    }

    // 通过 fetch 获取文件并创建 Blob 对象，避免浏览器跳转
    const fileResponse = await fetch(fileUrl);
    const blob = await fileResponse.blob();
    const link = document.createElement("a");
    const downloadUrl = window.URL.createObjectURL(blob);
    link.href = downloadUrl;
    link.download = `文件${id}.${fileExtension}`; // 使用动态扩展名

    link.style.display = "none"; // 隐藏链接元素
    document.body.appendChild(link); // 将链接添加到页面中

    // 模拟点击以触发下载
    link.click();

    // 下载后移除链接元素
    document.body.removeChild(link);

    // 释放 URL 对象
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("文件下载失败:", error);
    alert("文件下载失败，请稍后再试。");
  }
};
// 删除文件
const deleteFile = async (resourceId) => {
  if (confirm("确认删除此文件吗？")) {
    try {
      // 调用 API 删除文件
      await deleteCourseResource(resourceId); // 使用 resourceId 进行删除
      alert("文件已删除。");
      // 文件删除后重新加载文件列表
      fetchCourseWareList();
    } catch (error) {
      console.error("删除文件失败:", error);
      alert("文件删除失败，请稍后再试。");
    }
  }
};

// 获取文件列表
const fetchCourseWareList = async () => {
  try {
    // 设置加载状态
    loading.value = true; // 假设您有一个 loading 的 ref 变量来管理加载状态

    const response = await getCourseWareList(courseId);
    files.value = response.resourceList;

    // 处理成功的逻辑
    console.log("获取课件列表成功:", files.value);
  } catch (error) {
    // 处理错误
    console.error("获取课件列表失败:", error);
    alert("获取课件列表失败，请稍后再试。");
  } finally {
    // 清除加载状态
    loading.value = false; // 结束加载状态
  }
};

// 初始化获取文件列表
onMounted(() => {
  fetchCourseWareList();
});

// 上传文件成功后的回调
const handleSuccess = (response, file, fileList) => {
  console.log("文件上传成功:", response);
  fetchCourseWareList(); // 上传成功后重新加载文件列表
};

// 上传文件失败后的回调
const handleError = (error, file, fileList) => {
  console.error("文件上传失败:", error);
  alert("文件上传失败，请稍后再试");
};

// 上传文件前的钩子函数，进行限制或验证
const beforeUpload = (file) => {
  console.log("正在上传文件: ", file.name); // Debug log for file being uploaded
  const isPdf = file.type === "application/pdf";
  if (!isPdf) {
    alert("只能上传 PDF 文件!");
  }
  return isPdf; // 返回 false 阻止上传，true 表示允许上传
};

// 文件列表更新的处理
const handleChange = (file, fileList) => {
  console.log("文件列表更新:", file, fileList); // Debug log for file list changes
  fileList.value = fileList;
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
