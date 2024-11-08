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
          <div v-for="homework in homeworks" :key="homework.homeworkId" class="homework-item">
            <el-card>
              <h3 @click="viewHomeworkDetails(homework)" class="homework-title">作业 {{ homework.homeworkNum }}</h3>
              <p>提交时间: {{ homework.submissionDeadline }}</p>
              <el-button type="primary" @click="openSubmitModal(homework)">提交作业</el-button>
            </el-card>
          </div>
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
                accept=".pdf,.doc,.docx,.jpg,.png">
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
            <p><strong>提交时间:</strong> {{ detailHomework.submissionDeadline }}</p>
            <p><strong>作业内容:</strong></p>
            <p>{{ detailHomework.content }}</p>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeDetailModal">关闭</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from "vue";
  import { fetchMyHomework, submitHomework } from "@/api/CoursePageApi";
  import { useStore } from 'vuex';
  
  const store = useStore();
  // 使用 computed 获取 userNum
  const userNum = computed(() => store.getters.getUserInfo.userNum);
  const courseId = "1"; //TODO router中传来的courseId
  const homeworks = ref([]);
  const getMyHomework = async () => {
    try {
      const response = await fetchMyHomework("852464",courseId);
      homeworks.value = response.homeworkList;
    } catch (error) {
      console.error("获取作业失败", error);
    }
  } 
  
  onMounted(() => {
    getMyHomework();
  });
  
  const isModalOpen = ref(false);
  const isDetailVisible = ref(false);
  const currentHomework = ref({});
  const detailHomework = ref({});
  const homeworkContent = ref('');
  const attachments = ref([]);
  
  const viewHomeworkDetails = (homework) => {
    detailHomework.value = homework; // 获取作业详情
    isDetailVisible.value = true; // 显示作业详情对话框
  };
  
  const closeDetailModal = () => {
    isDetailVisible.value = false; // 关闭作业详情对话框
  };
  
  const openSubmitModal = (homework) => {
    currentHomework.value = homework;
    isModalOpen.value = true;
  };
  
  const closeModal = () => {
    isModalOpen.value = false;
    homeworkContent.value = '';
    attachments.value = [];
  };
  
  const handleFileUpload = (file) => {
    attachments.value = [...attachments.value, file]; // 将新的文件添加到附件列表中
  };
  
  const submit = async () => {
    try {
    // 获取作业 ID 和内容
    const homeworkId = currentHomework.value.homeworkId;
    const studentContent = homeworkContent.value;

    // 获取附件文件数组（确保 raw 是 `File` 对象）
    const files = attachments.value.map(file => file.raw);

    // 调用 submitHomework 函数，传递作业 ID、内容和附件（文件对象数组）
    const response = await submitHomework(homeworkId, studentContent, files);

    console.log("提交结果:", response);
    closeModal();  // 提交后关闭模态框
  } catch (error) {
    console.error("提交失败", error);
  }
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
  