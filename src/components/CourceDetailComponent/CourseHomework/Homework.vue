<template>
  <el-container>
    <el-header>
      <h2>作业列表</h2>
    </el-header>

    <el-main>
      <!-- 无作业时的提示 -->
      <div v-if="homeworks.length === 0" class="no-homework">
        暂无作业
      </div>

      <!-- 作业列表展示 -->
      <div v-else class="homework-list-container">
        <div v-for="homework in paginatedHomeworks" :key="homework.homeworkId" class="homework-item">
          <el-card>
            <h3 @click="viewHomeworkDetails(homework)" class="homework-title">作业 {{ homework.homeworkNum }}</h3>
            <p>作业内容：{{ homework.content }}</p>
            <p>是否已提交：{{ homework.submitcheck }}</p>
            <p>提交截至时间: {{ homework.submissionDeadline }}</p>
            <p v-if="homework.score">得分: {{ homework.score }}</p>
            <p v-else>批改状态: 未批改</p>
            <el-button type="primary" @click="openSubmitModal(homework)">提交作业</el-button>
            <el-button type="primary">作业互评</el-button>
          </el-card>
        </div>
      </div>

      <!-- 分页控件 -->
      <div style="position: fixed; bottom: 0; width: 100%; text-align: center; display: flex; justify-content: center;align-items: center;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="homeworks.length"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>

      <!-- 提交作业对话框 -->
      <el-dialog v-model="isModalOpen" title="提交作业" width="30%">
        <template #header>
          <h2>提交作业: {{ currentHomework.title }}</h2>
        </template>

        <el-form>
          <el-form-item label="作业内容">
            <el-input type="textarea" v-model="homeworkContent" placeholder="写下你的作业..." required></el-input>
          </el-form-item>
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
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="closeModal">关闭</el-button>
          <el-button type="primary" @click="submit">提交</el-button>
        </span>
      </el-dialog>

      <!-- 作业详情对话框 -->
      <el-dialog v-model="isDetailVisible" title="作业详情" width="60%">
        <template #header>
          <h2>作业 {{ detailHomework.homeworkNum }}</h2>
        </template>
        <div>
          <p><strong>提交截至时间:</strong> {{ detailHomework.submissionDeadline }}</p>
          <p><strong>作业内容:</strong></p>
          <p>{{ detailHomework.content }}</p>
          <p><strong>批改状态:</strong> 
            <span v-if="detailHomework.score">{{ detailHomework.score }}</span>
            <span v-else>未批改</span>
          </p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeDetailModal">关闭</el-button>
        </span>
      </el-dialog>

      <!-- 提交作业确认弹窗 -->
      <el-dialog
        v-model="isCheckModalOpen"
        title="警告"
        width="400px"
        @close="handleDialogClose"
      >
        <p>作业已提交，再次提交会覆盖之前的作业内容</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleDialogClose">取消</el-button>
          <el-button type="primary" @click="confirmSubmit">确认</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
  
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { ElMessage  } from 'element-plus';  // 引入 element-plus 的消息组件
import {useStore} from 'vuex'
import { fetchMyHomework,submitHomework } from "@/api/CoursePageApi";
import { useRoute } from "vue-router";
const homeworks = ref([]);
const isModalOpen = ref(false);
const isCheckModalOpen=ref(false);
const isDetailVisible = ref(false);
const currentHomework = ref({});
const detailHomework = ref({});
const homeworkContent = ref('');
const attachments = ref([]);
const currentPage = ref(1);
const pageSize = 5;
const store = useStore();
const route = useRoute()
  // 使用 computed 获取 userNum
const userNum = computed(() => store.getters.getUserInfo.userNum);
const courseId = route.params.id;

console.log(courseId)
// Simulated function to fetch homework
const getMyHomework = async () => {
    try {
      const response = await fetchMyHomework(userNum.value,courseId);
      homeworks.value = response.homeworkList;
      console.log("success")
    } catch (error) {
      console.error("获取作业失败", error);
    }
  } 
onMounted(() => {
  getMyHomework();
});

const paginatedHomeworks = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return homeworks.value.slice(start, start + pageSize);
});

// View homework details
const viewHomeworkDetails = (homework) => {
  detailHomework.value = homework;
  isDetailVisible.value = true;
};

// Close the homework detail dialog
const closeDetailModal = () => {
  isDetailVisible.value = false;
};

// Open the submit modal
const openSubmitModal = (homework) => {
  currentHomework.value = homework;
   // 判断作业是否已提交
  if (homework.submitcheck === "已提交") {
    if (homework.submitcheck === "已提交") {
      ElMessage.warning('作业已提交！');
      isCheckModalOpen.value = true;
      return; // 不再继续执行
    }

    // 否则，打开弹窗
    isModalOpen.value = true;
  }
};

const confirmSubmit = () => {
  isModalOpen.value = true;
}
const handleDialogClose = () => {
  isCheckModalOpen.value = false;
  isModalOpen.value = false;
}
// Close the submit modal
const closeModal = () => {
  isModalOpen.value = false;
  homeworkContent.value = '';
  attachments.value = [];
};

// Handle file upload
const handleFileUpload = (file) => {
  attachments.value = [...attachments.value, file];
};

const submit = async () => {
    try {
    // 获取作业 ID 和内容
    const homeworkId = currentHomework.value.homeworkId;
    const studentContent = homeworkContent.value;

    // 获取附件文件数组（确保 raw 是 File 对象）
    const files = attachments.value.map(file => file.raw);

    // 调用 submitHomework 函数，传递作业 ID、内容和附件（文件对象数组）
    const response = await submitHomework(homeworkId, studentContent, files);

    console.log("提交结果:", response);
      closeModal();  // 提交后关闭模态框
      isCheckModalOpen.value = false;
    // 提交成功后，显示成功的提示信息
    ElMessage({
        message: '作业提交成功！',
        type: 'success',
        duration: 1000  // 0.5秒后自动消失
      });

    } catch (error) {
      console.error("提交失败", error);
      // 提交失败时显示错误信息
      ElMessage.error('提交失败，请重试！');
    }
};

const handlePageChange = (page) => {
  currentPage.value = page;
};
</script>

<style scoped>
.homework-item {
  margin-bottom: 10px;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.homework-title {
  cursor: pointer;
  font-weight: bold;
  margin-bottom: 5px;
}

.upload-demo {
  margin-top: 20px;
}

.dialog-footer {
  text-align: right;
}

.homework-list-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.no-homework {
  text-align: center;
  font-size: 16px;
  color: #909399;
  padding: 50px 0;
}
</style>
