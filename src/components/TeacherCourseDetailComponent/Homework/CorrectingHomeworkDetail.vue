<template>
  <div class="correcting-homework-detail">
    <div class="correcting-homework-detail-content">
      <el-table :data="submitList" style="width: 100%; margin-top: 30px">
        <el-table-column label="学生ID" prop="studentId"></el-table-column>
        <el-table-column label="学生姓名" prop="studentName"></el-table-column>
        <el-table-column label="提交时间" prop="submitTime"></el-table-column>
        <el-table-column
          label="提交状态"
          prop="isSubmit"
          :formatter="formatSubmitState"
        ></el-table-column>
        <el-table-column
          label="批改状态"
          prop="isBeingCorrected"
          :formatter="formatCorrectedState"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" @click="handleCorrect(row)"
              >批改/查看成绩</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog
    v-model="correctHomeworkDialogVisible"
    class="homework-submit-detail"
    width="90vw"
  >
    <div class="correct-dialog-body">
      <div class="correct-homework-content">作业内容</div>
      <el-input
        type="textarea"
        v-model="homeworkContent"
        placeholder="作业内容"
        rows="6"
        readonly
      ></el-input>
      <el-button type="primary" class="correct-homework-content"
        >提交文件下载</el-button
      >
      <div class="correct-homework-preview">
        <iframe
          :src="previewFileUrl"
          width="100%"
          height="250px"
          type="application/pdf"
        ></iframe>
      </div>
      <div class="correct-homework-score">
        <div class="correct-homework-score-tip">批改成绩：</div>
        <el-input
          class="correct-homework-score-input"
          v-model="homeworkScore"
          placeholder="请输入分数"
        ></el-input>
        <el-button type="primary" class="submit-score">提交</el-button>
      </div>
    </div>
  </el-dialog>
  <!-- <el-dialog
    v-model="homeworkScoreDialogVisible"
    class="homework-submit-detail"
    width="90vw"
  >
    <div class="correct-dialog-body">
      <div class="correct-homework-content">作业内容</div>
      <el-input
        type="textarea"
        v-model="homeworkContent"
        placeholder="作业内容"
        rows="10"
        readonly
      ></el-input>
      <el-button type="primary" class="correct-homework-content"
        >提交文件下载</el-button
      >
      <div class="correct-homework-score">批改成绩：{{ homeworkScore }}</div>
    </div>
  </el-dialog> -->
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getStudentHomeworkList} from "@/api/CoursePageApi"
const route = useRoute();
const homeworkNum = route.params.homeWorkNum;
const correctHomeworkDialogVisible = ref(false),
  homeworkScoreDialogVisible = ref(false);
// 定义响应式变量 fileUrl
const previewFileUrl = ref("/2411.02310v1.pdf");
const homeworkScore = ref("");
const homeworkContent = ref("作业内容");

const submitList = ref([
  {
    studentID: "1",
    studentName: "学生1",
    submitTime: "-",
    isSubmit: false,
    isBeingCorrected: false,
  },
  {
    studentID: "2",
    studentName: "学生2",
    submitTime: "2021-07-01 12:00:00",
    isSubmit: true,
    isBeingCorrected: false,
  },
  {
    studentID: "3",
    studentName: "学生3",
    submitTime: "2021-07-01 12:00:00",
    isSubmit: true,
    isBeingCorrected: true,
  },
]);
function handleCorrect(row) {
  correctHomeworkDialogVisible.value = true;
}
function handleScore(row) {
  homeworkScoreDialogVisible.value = true;
}
function formatSubmitState(row) {
  return row.isSubmit ? "已提交" : "未提交";
}
function formatCorrectedState(row) {
  return row.isBeingCorrected ? "已批改" : "未批改";
}
</script>

<style scoped>
.correcting-homework-detail {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.correcting-homework-detail-content {
  width: 80%;
  height: 100%;
  display: flex;
}

.correct-dialog-body {
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: auto;
}
.correct-homework-content {
  font-size: 1.2rem;
  font-weight: bolder;
  width: 100%;
  height: 25px;
  /* margin: 10px 0; */
}
.correct-homework-preview {
  width: 100%;
  height: 250px;
}
.correct-homework-score {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
}
.correct-homework-score-tip {
  width: 20%;
}
.correct-homework-score-input {
  width: 75%;
}
.submit-score {
  width: 15%;
}
</style>
