<template>
    <el-container>
      <el-header>
        <h2>作业列表</h2>
      </el-header>
      
      <el-main>
        <div v-for="homework in homeworks" :key="homework.id" class="homework-item">
          <el-card>
            <h3 @click="viewHomeworkDetails(homework)" class="homework-title">{{ homework.title }}</h3>
            <p>提交时间: {{ homework.submissionTime }}</p>
            <el-button type="primary" @click="openSubmitModal(homework)">提交作业</el-button>
          </el-card>
        </div>
  
        <el-dialog :visible.sync="isModalOpen" title="提交作业" width="30%">
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
            <el-button type="primary" @click="submitHomework">提交</el-button>
          </span>
        </el-dialog>
  
        <el-dialog :visible.sync="isDetailVisible" title="作业详情" width="40%">
          <template #header>
            <h2>{{ detailHomework.title }}</h2>
          </template>
          <div>
            <p><strong>提交时间:</strong> {{ detailHomework.submissionTime }}</p>
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
import { fetchMyHomework } from "@/api/CoursePageApi";
import { useStore } from 'vuex';

const store = useStore();
// 使用 computed 获取 userNum
const userNum = computed(() => store.getters.getUserInfo.userNum);
import { ElContainer, ElHeader, ElMain, ElCard, ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElUpload } from 'element-plus';
  
const fetchMyHomework = async () => {
  console.log(userNum);
  try {
    const response = await getMyHomework(userNum.value);
    homeworks.value = response.homeworkList;
  } catch (error) {
    console.error("获取作业失败", error);
  }
} 
onMounted(() => {
  fetchMyHomework();
})
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
  
  const handleFileUpload = (fileList) => {
      attachments.value = fileList; // 更新附件列表
  };
  
  const submitHomework = () => {
      // 提交作业的逻辑
      console.log('提交的作业内容:', homeworkContent.value);
      console.log('上传的附件:', attachments.value);
      
      // 这里可以添加 API 调用来提交作业
  
      closeModal(); // 提交后关闭模态框
  };
  </script>
  
  <style scoped>
  .homework-item {
      margin-bottom: 20px;
  }
  .homework-title {
      cursor: pointer;
  }
  .upload-demo {
      margin-top: 20px;
  }
  .dialog-footer {
      text-align: right;
  }
</style>
  