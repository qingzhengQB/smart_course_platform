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
        placeholder="Select date and time"
        />
      </el-form-item>

      <!-- 作业内容 -->
      <el-form-item label="作业内容" prop="content">
        <el-input
          v-model.trim.lazy="content"
          type="textarea"
          placeholder="请输入作业内容"
          rows="4"
        ></el-input>
      </el-form-item>

      <!-- 上传附件 -->
      <el-form-item label="上传附件">
        <el-upload
          class="upload-demo"
          drag
          multiple
          :on-change="handleFileUpload"
          :file-list="attachments"
          :auto-upload="false"
          :show-file-list="true"
          :limit="5"
          accept=".pdf,.doc,.docx,.jpg,.png"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或<em>点击上传</em>
          </div>
        </el-upload>
        <div v-if="attachments.length > 0">已选择附件：{{ attachments.map(att => att.name).join(', ') }}</div>
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
      <el-table-column label="截止时间" prop="submissionDeadline"></el-table-column>
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
const homeworkNum = ref(""),
  deadline = ref(null),  // 默认为 null，确保可以在页面渲染时处理日期
  content = ref("");

// 附件列表
const attachments = ref([]);

// 作业列表
const homeworkList = ref([]);

// 校验文件上传限制
const handleFileUpload = (file, fileList) => {
  attachments.value = fileList;
};

// 提交作业
const submitHomework = async () => {
  // 验证输入
  if (!homeworkNum || !deadline || !content) {
    ElMessage.error("请填写完整的作业信息!");
    return;
  }

  console.log(deadline)
  // 检查截止时间是否有效
  const deadlineDate = new Date(deadline.value);

  // 格式化截止时间为 ISO 8601 格式
  const formattedDeadline = deadlineDate.toISOString();

  // 准备上传数据
  const formData = new FormData();
  formData.append("homeworkNum", homeworkNum.value);
  formData.append("deadline", formattedDeadline);
  formData.append("content", content.value);

  // 如果有附件，追加文件
  attachments.value.forEach((file, index) => {
    formData.append(`file${index}`, file.raw);
  });

  try {
    const response = await axios.post(
      `http://localhost:8000/teacher/course/${courseId}/uploadHomework`,
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

.upload-demo {
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
