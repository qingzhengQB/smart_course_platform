<template>
  <div class="homework-container">
    <!-- 发布作业表单 -->
    <el-form
      ref="form"
      label-width="120px"
      class="homework-form"
      @submit.prevent="submitHomework"
    >
      <!-- 作业编号 -->
      <el-form-item label="作业编号" prop="homeworkNum">
        <el-input
          v-model="homeworkNum"
          type="number"
          placeholder="请输入作业编号"
        ></el-input>
      </el-form-item>

      <!-- 截止时间 -->
      <el-form-item label="截止时间" prop="deadline">
        <el-date-picker
          v-model="deadline"
          type="datetime"
          placeholder="请选择截止时间"
          format="YYYY-MM-DD HH:mm:ss"
        ></el-date-picker>
      </el-form-item>

      <!-- 作业内容 -->
      <el-form-item label="作业内容" prop="content">
        <el-input
          v-model.trim.lazy="content"
          typ
          e="textarea"
          placeholder="请输入作业内容"
          rows="4"
        ></el-input>
      </el-form-item>

      <!-- 文件上传 -->
      <el-form-item label="上传文件" prop="file">
        <el-upload
          class="upload-file"
          :on-change="handleFileChange"
          :on-remove="handleRemoveFile"
          :limit="1"
          :file-list="fileList"
          accept=".pdf,.docx,.pptx,.xlsx"
          auto-upload="false"
          :before-upload="beforeUpload"
        >
          <el-button type="primary">选择附件</el-button>
        </el-upload>
        <div v-if="fileList.length > 0">已选择文件：{{ fileList[0].name }}</div>
      </el-form-item>

      <!-- 提交按钮 -->
      <el-form-item>
        <el-button type="primary" @click="submitHomework">发布作业</el-button>
      </el-form-item>
    </el-form>

    <!-- 已发布作业列表 -->
    <el-table :data="homeworkList" style="width: 100%; margin-top: 30px">
      <el-table-column label="作业编号" prop="homeworkNum"></el-table-column>
      <el-table-column label="作业内容" prop="content"></el-table-column>
      <el-table-column
        label="截止时间"
        prop="submissionDeadline"
      ></el-table-column>
      <el-table-column label="文件" prop="file">
        <template #default="{ row }">
          <a v-if="row.fileUrl" :href="row.fileUrl" target="_blank">查看附件</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import axios from "axios";

// 获取路由信息
const route = useRoute();
const router = useRouter();
const courseId = route.params.id;

// 表单数据
// const form = ref({
const homeworkNum = ref(""),
  deadline = ref(""), // Ensure it starts as a proper Date object or null
  content = ref("");
// });

// 文件列表
const fileList = ref([]);

// 作业列表
const homeworkList = ref([]);

// 校验文件上传限制
const beforeUpload = (file) => {
  const isValid =
    file.type === "application/pdf" ||
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.type ===
      "application/vnd.openxmlformats-officedocument.presentationml.presentation" ||
    file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  if (!isValid) {
    ElMessage.error("只能上传 PDF, DOCX, PPTX 或 XLSX 文件!");
  }
  return isValid;
};

// 文件更改处理
const handleFileChange = (file, fileList) => {
  fileList.value = fileList;
};

// 文件移除处理
const handleRemoveFile = (file, fileList) => {
  fileList.value = fileList;
};

// 提交作业
const submitHomework = async () => {
  // const { homeworkNum, deadline, content } = form.value;

  // 验证输入
  if (!homeworkNum || !deadline || !content) {
    ElMessage.error("请填写完整的作业信息!");
    return;
  }

  // 格式化截止时间
  const formattedDeadline = new Date(deadline).toISOString();

  // 准备上传数据
  const formData = new FormData();
  formData.append("homeworkNum", homeworkNum);
  formData.append("deadline", formattedDeadline);
  formData.append("content", content);

  // 如果有文件，追加文件
  if (fileList.value.length > 0) {
    formData.append("file", fileList.value[0].raw);
  }

  try {
    const response = await axios.post(
      `http://localhost:8000/course/${courseId}/uploadHomework`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    ElMessage.success(response.data.message || "作业发布成功");
    fetchHomeworkList(); // 发布成功后刷新作业列表
  } catch (error) {
    ElMessage.error("发布作业失败，请稍后再试");
  }
};

// 获取已发布作业列表
const fetchHomeworkList = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/teacher/course/${courseId}/homeworkList`
    );
    homeworkList.value = response.data.homeworkList;

    // 如果后端返回的数据包含日期字符串，确保转换为 Date 对象
    if (homeworkList.value.length > 0) {
      homeworkList.value.forEach((homework) => {
        // 如果返回的 submissionDeadline 是字符串，转换为 Date 对象
        if (homework.submissionDeadline) {
          homework.submissionDeadline = new Date(homework.submissionDeadline);
        }
      });
    }
  } catch (error) {
    ElMessage.error("获取作业列表失败，请稍后再试");
  }
};

// 在组件挂载时获取已发布的作业列表
onMounted(() => {
  fetchHomeworkList();
});
</script>

<style scoped lang="scss">
.homework-container {
  padding: 20px;
}

.homework-form {
  max-width: 800px;
  margin: 0 auto;
}

.upload-file {
  width: 100%;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-form-item .el-upload {
  width: 100%;
}

.el-button {
  width: 100%;
}

.el-table {
  margin-top: 20px;
}

.el-table .el-button {
  margin-right: 10px;
}
</style>
