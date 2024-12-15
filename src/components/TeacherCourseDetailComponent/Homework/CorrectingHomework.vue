<template>
  <div class="correcting-homework-detail">
    <el-table :data="homeworkList" style="width: 90%; margin-top: 30px">
      <el-table-column
        label="作业编号"
        prop="homeworkNum"
        width="300"
      ></el-table-column>
      <el-table-column
        label="作业标题"
        prop="content"
        width="300"
      ></el-table-column>
      <el-table-column
        label="提交人数"
        prop="totalSubmit"
        width="300"
      ></el-table-column>
      <el-table-column label="批改">
        <template #default="{ row }">
          <el-button type="primary" @click="handleCorrect(row)">批改</el-button>
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
const homeworkList = ref([]);
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
function handleCorrect(row) {
  router.push({
    name: "correcting-homework-detail",
    params: { homeWorkNum: row.homeworkNum },
  });
}
onMounted(() => {
  fetchHomeworkList();
});
</script>

<style lang="scss" scoped>
.correcting-homework-detail {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
</style>
