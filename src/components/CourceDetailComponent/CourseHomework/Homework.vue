<template>
  <el-container>
    <el-header>
      <h2>作业列表</h2>
    </el-header>

    <el-main>
      <!-- 无作业时的提示 -->
      <div v-if="homeworks.length === 0" class="no-homework">暂无作业</div>

      <!-- 作业列表展示 -->
      <div v-else class="homework-list-container">
        <div
          v-for="homework in paginatedHomeworks"
          :key="homework.homeworkId"
          class="homework-item"
        >
          <el-card>
            <h3 @click="viewHomeworkDetails(homework)" class="homework-title">
              作业 {{ homework.homeworkNum }}
            </h3>
            <p>作业内容：{{ homework.content }}</p>
            <p>是否已提交：{{ homework.submitcheck }}</p>
            <p>提交截至时间: {{ homework.submissionDeadline }}</p>
            <p v-if="homework.score">得分: {{ homework.score }}</p>
            <p v-else>批改状态: 未批改</p>
            <el-button type="primary" @click="openSubmitModal(homework)"
              >提交作业</el-button
            >
            <el-button
              type="primary"
              @click="homeworkMutualCorrecting(homework)"
              >作业互评</el-button
            >
          </el-card>
        </div>
      </div>

      <!-- 分页控件 -->
      <div
        style="
          position: fixed;
          bottom: 0;
          width: 100%;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
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
            <el-input
              type="textarea"
              v-model="homeworkContent"
              placeholder="写下你的作业..."
              required
            ></el-input>
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
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
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
          <p>
            <strong>提交截至时间:</strong>
            {{ detailHomework.submissionDeadline }}
          </p>
          <p><strong>作业内容:</strong></p>
          <p>{{ detailHomework.content }}</p>
          <p>
            <strong>批改状态:</strong>
            <span v-if="detailHomework.score">{{ detailHomework.score }}</span>
            <span v-else>未批改</span>
          </p>
          <!-- 添加附件下载链接 -->
          <p><strong>附件:</strong>
              <a href="#" @click.prevent="downloadAttachment(resourceId)">
                {{ filename }}
              </a>
            </p>
          <!-- 显示已提交的作业内容
    <p v-if="detailHomework.submittedContent">
      <strong>已提交的作业内容:</strong>
      <p>{{ detailHomework.submittedContent }}</p>
    </p> -->
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
  <el-dialog
    v-model="correctHomeworkDialogVisible"
    class="homework-submit-detail"
    width="90vw"
    top="10vh"
  >
    <div class="correct-dialog-options-container">
      <el-button @click="isShowCorrectScoreView = false">互评作业</el-button>
      <el-button @click="isShowCorrectScoreView = true">查看互评得分</el-button>
    </div>
    <div v-if="!isShowCorrectScoreView" class="correct-dialog-body">
      <div class="correct-homework-aria">
        <div class="correct-homework-content">
          作业互评 {{ selectHomeworkIndex + 1 }}
        </div>
        <div class="pdf-container">
          <iframe
            :src="homeworkUrl"
            width="100%"
            height="100%"
            type="application/pdf"
            class="pdf-iframe"
          ></iframe>
        </div>
        <el-input
          type="textarea"
          v-model="correctHomeworkContent"
          placeholder="作业内容"
          rows="10"
          readonly
        ></el-input>
        <div class="correct-homework-score">
          <el-input
            class="correct-homework-score-input"
            type="textarea"
            :rows="10"
            v-model="homeworkeCommentList[selectHomeworkIndex]"
            placeholder="请输入评语"
          ></el-input>

          <el-input
            class="correct-homework-score-input"
            v-model="homeworkScoreList[selectHomeworkIndex]"
            placeholder="请输入互评分数"
          ></el-input>
          <el-button type="primary" class="submit-score" @click="submitScore()"
            >提交</el-button
          >
        </div>
      </div>
      <div class="page-left-button page-button" @click="turnPage('left')">
        <i class="fa-solid fa-angle-left"></i>
      </div>
      <div class="page-right-button page-button" @click="turnPage('right')">
        <i class="fa-solid fa-angle-right"></i>
      </div>
    </div>
    <div class="correct-dialog-body" v-else>
      <div class="correct-homework-content">本次作业互评得分</div>
      <el-form>
        <el-form-item label="互评得分: ">
          <span class="self-correct-homework-score"
            >{{ correctHomeworkScore }} 分</span
          >
        </el-form-item>
        <el-form-item label="互评人: ">
          <span class="self-homework-score-correcter">{{
            selfHomeworkCorrecter
          }}</span>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { ElMessage } from "element-plus"; // 引入 element-plus 的消息组件
import { useStore } from "vuex";
import {
  fetchMyHomework,
  submitHomework,
  fetchHomeworkAttachments,
  downLoadCourseResource
} from "@/api/CoursePageApi";
import { useRoute } from "vue-router";
import axios from "axios";
import { number } from "echarts";
const homeworks = ref([]);
const isModalOpen = ref(false);
const isCheckModalOpen = ref(false);
const isDetailVisible = ref(false);
const correctHomeworkDialogVisible = ref(false);
const isShowCorrectScoreView = ref(false);
const currentHomework = ref({});
const detailHomework = ref({});
const homeworkContent = ref("");
const correctHomeworkContent = ref("这是随机到的互评学生的作业内容");
const correctHomeworkScore = ref("未被互评");
const selfHomeworkCorrecter = ref("张三");
const previewFileUrl = ref("/2411.02310v1.pdf");
const homeworkScore = ref(0);
const attachments = ref([]);
const currentPage = ref(1);
const pageSize = 6;
const store = useStore();
const route = useRoute();
const homeworkUrl = ref("/2411.02310v1.pdf");
const correctHomeworkList = ref([]);
// 以下两项在获取到互评列表后，按照 selectHomeworkIndex 赋值为列表指定项
const homeworkScoreList = ref([]); // 互评分数列表
const homeworkeCommentList = ref([]); // 互评评语列表
const selectHomeworkIndex = ref(0);
// 使用 computed 获取 userNum
const userNum = computed(() => store.getters.getUserInfo.userNum);
const courseId = route.params.id;
const attachment = ref([]);
const filename=ref("无");
const resourceId = ref([])
// Simulated function to fetch homework
const getMyHomework = async () => {
  try {
    const response = await fetchMyHomework(userNum.value, courseId);
    homeworks.value = response.homeworkList;
    console.log("success");
  } catch (error) {
    console.error("获取作业失败", error);
  }
};
// 在获取作业详情的函数中添加获取附件的逻辑
const getHomeworkAttachment = async (homeworkNum) => {
  try {
    console.log("获取附件");
    console.log(courseId);
    console.log(homeworkNum);
    // 获取作业附件
    attachment.value = await fetchHomeworkAttachments(
      courseId,
      homeworkNum
    );
    resourceId.value = attachment.value.data.resourceId
    filename.value = attachment.value.data.URL.split('http://localhost:8000/src/main/resources/static/course/').pop();
    console.log(resourceId.value);
    console.log(attachment.value);
  } catch (error) {
    console.error("获取作业详情失败", error);
  }
};
const getConrrctHomework = async (homeworkNum) => {
  try {
    console.log(store.state.userinfo.userNum);
    const response = await axios.get(
      `http://localhost:8000/student/homework/${courseId}/${homeworkNum}/homeworkReviews`,
      {
        params: {
          studentNum: store.state.userinfo.userNum,
        },
      }
    );
    correctHomeworkList.value = response.homeworkList;
    correctHomeworkList.value.length = Array(
      correctHomeworkList.value.length
    ).fill("");
    homeworkeCommentList.value = Array(correctHomeworkList.value.length).fill(
      ""
    );
    selectHomeworkIndex.value = 0;
    console.log("success");
  } catch (error) {
    console.error("获取作业失败", error);
  }
};
const submitScore = async (homeworkId) => {
  try {
    const formData = new FormData();
    formData.append("score", homeworkScoreList.value[selectHomeworkIndex]);
    formData.append(
      "comments",
      homeworkeCommentList.value[selectHomeworkIndex]
    );
    const response = await axios.post(
      `http://localhost:8000/student/homework/${homeworkId}/review`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("success");
  } catch (error) {
    console.error("获取作业失败", error);
  }
};
const turnPage = (direction) => {
  if (direction === "left") {
    if (selectHomeworkIndex.value === 0) {
      selectHomeworkIndex.value = correctHomeworkList.value.length - 1;
    } else {
      selectHomeworkIndex.value -= 1;
    }
  } else {
    if (selectHomeworkIndex.value === correctHomeworkList.value.length - 1) {
      selectHomeworkIndex.value = 0;
    } else {
      selectHomeworkIndex.value += 1;
    }
  }
};
onMounted(() => {
  getMyHomework();
});

const paginatedHomeworks = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return homeworks.value.slice(start, start + pageSize);
});

// View homework details
const viewHomeworkDetails = (homework) => {
  getHomeworkAttachment(homework.homeworkNum); // 获取作业附件
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
    ElMessage.warning("作业已提交！");
    isCheckModalOpen.value = true;
    return; // 不再继续执行
  }

  // 否则，打开弹窗
  isModalOpen.value = true;
};

function homeworkMutualCorrecting(homework) {
  console.log("作业互评", homework);
  correctHomeworkDialogVisible.value = true;
  getConrrctHomework(homework.homeworkNum);
}

const confirmSubmit = () => {
  isModalOpen.value = true;
};
const handleDialogClose = () => {
  isCheckModalOpen.value = false;
  isModalOpen.value = false;
};
// Close the submit modal
const closeModal = () => {
  isModalOpen.value = false;
  homeworkContent.value = "";
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
    const files = attachments.value.map((file) => file.raw);

    // 调用 submitHomework 函数，传递作业 ID、内容和附件（文件对象数组）
    const response = await submitHomework(
      homeworkId,
      courseId,
      studentContent,
      files
    );

    console.log("提交结果:", response);
    closeModal(); // 提交后关闭模态框
    isCheckModalOpen.value = false;
    getMyHomework();
    // 提交成功后，显示成功的提示信息
    ElMessage({
      message: "作业提交成功！",
      type: "success",
      duration: 1000, // 0.5秒后自动消失
    });
  } catch (error) {
    console.error("提交失败", error);
    // 提交失败时显示错误信息
    ElMessage.error("提交失败，请重试！");
  }
};

const handlePageChange = (page) => {
  currentPage.value = page;
};

// 添加下载附件的方法
const downloadAttachment = async (id) => {
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

    // 模拟点击以触发下���
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
</script>

<style lang="scss" scoped>
$pagebuttonwidth: 20px;
$pagebuttonheight: 100px;
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
.homework-submit-detail {
  position: relative;
}
.correct-dialog-options-container {
  display: flex;
  gap: 10px;
  /* justify-content: center; */
  align-items: center;
  margin: 10px 80px;
}
.el-dialog__body {
  position: relative;
}
.correct-dialog-body {
  width: 80%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: auto;
  overflow-y: auto;
  overflow-x: visible;
}
.correct-homework-content {
  font-size: 1.2rem;
  font-weight: bolder;
  margin: 10px 0;
  width: 100%;
  height: 35px;
  /* margin: 10px 0; */
}
.pdf-iframe {
  height: 50vh;
}
.correct-homework-score {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
}
.correct-homework-score-input {
  width: 80%;
}
.submit-score {
  width: 15%;
}
.page-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: $pagebuttonwidth;
  height: $pagebuttonheight;
  background-color: var(--main-page-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 100px 20px;
  border: #000 2px solid;
  z-index: 10000;
  font-size: 2rem;
}
.page-left-button {
  left: calc(#{$pagebuttonwidth});
}
.page-right-button {
  right: calc(#{$pagebuttonwidth});
}
.attachments-section {
  margin-top: 15px;
  padding: 10px;
  border-top: 1px solid #ddd;
}

.attachment-list {
  margin-top: 10px;
}

.attachment-item {
  padding: 8px;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
  
  a {
    color: #151516;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
      color: #409EFF;
    }
  }
}
</style>
