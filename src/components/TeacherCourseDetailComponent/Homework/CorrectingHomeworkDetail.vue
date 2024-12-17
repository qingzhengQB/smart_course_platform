<template>
  <div class="correcting-homework-detail">
    <div class="correcting-homework-detail-content">
      <el-table :data="submitList" style="width: 100%; margin-top: 30px">
        <el-table-column label="学生ID" prop="studentNum"></el-table-column>
        <el-table-column label="学生姓名" prop="studentName"></el-table-column>
        <!-- <el-table-column label="提交时间" prop="submitTime"></el-table-column> -->
        <el-table-column
          label="提交状态"
          prop="submitCheck"
          :formatter="formatSubmitState"
        ></el-table-column>
        <el-table-column
          label="批改状态"
          prop="correctCheck"
          :formatter="formatCorrectedState"
        ></el-table-column>
        <!-- 新增分数列 -->
        <el-table-column label="分数" prop="homeworkScore">
          <template #default="{ row }">
            <span>{{ row.grade || '未评分' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" @click="handleCorrect(row)">批改/查看成绩</el-button>
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
      <el-button type="primary" class="correct-homework-content">
        提交文件下载
      </el-button>
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
        <el-button type="primary" class="submit-score" @click="submitGrade(currentRow)">
          提交
        </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getStudentHomeworkList, getStudentHomeworkDetial, submitGradeByTeacher } from "@/api/CoursePageApi";
import { ElMessage } from "element-plus";

// 获取路由信息
const route = useRoute();
const courseId = route.params.id;
const homeworkNum = route.params.homeWorkNum;
const correctHomeworkDialogVisible = ref(false);
const previewFileUrl = ref("");
const homeworkScore = ref("");
const homeworkContent = ref("");
const currentRow = ref(null);  // 保存当前行数据

// 作业提交列表
const submitList = ref([]);

// 获取作业提交列表
const getstudentHomeworkList = async () => {
  try {
    const response = await getStudentHomeworkList(courseId, homeworkNum);
    submitList.value = response.homeworkDetailsList;
    submitList.forEach((homeworkDetails) => {
      if (homeworkDetails.submitCheck !== 1) {
        homeworkDetails.submitStatus = 0;
      }
      if (homeworkDetails.correctCheck !== 1) {
        homeworkDetails.correctStatus = 0;
      }
    });
    console.log(submitList);
  } catch (error) {
    console.error("获取提交学生列表失败");
  }
};

// 处理批改/查看成绩
async function handleCorrect(row) {
  currentRow.value = row;  // 保存当前选中的行
  if (row.submitCheck === 1) {
    correctHomeworkDialogVisible.value = true;
    try {
      const response = await getStudentHomeworkDetial(row.homeworkId);
      previewFileUrl.value = response.URL;
      homeworkContent.value = response.homework.studentContent;
    } catch (error) {
      console.error("获取学生作业详情失败");
      ElMessage.error("获取学生作业详情失败");
    }
  } else {
    ElMessage.warning("该学生未提交作业");
  }
}

// 格式化提交状态
function formatSubmitState(row) {
  return row.submitCheck ? "已提交" : "未提交";
}

// 格式化批改状态
function formatCorrectedState(row) {
  return row.correctCheck ? "已批改" : "未批改";
}

// 提交分数
async function submitGrade(row) {
  if (!homeworkScore.value) {
    ElMessage.warning("请输入分数");
    return;
  }

  try {
    // 提交成绩
    await submitGradeByTeacher(row.homeworkId, homeworkScore.value);
    correctHomeworkDialogVisible.value = false;
    // 刷新作业列表
    await getstudentHomeworkList();
    ElMessage.success("分数提交成功");
  } catch (error) {
    console.error("提交分数详情失败", error);
    ElMessage.error("提交分数详情失败");
  }
}

onMounted(() => {
  getstudentHomeworkList();
});
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
