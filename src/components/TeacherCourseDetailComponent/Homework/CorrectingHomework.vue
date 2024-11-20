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
const router = useRouter();
const homeworkList = ref([
  {
    homeworkNum: "1",
    content: "作业内容",
    totalSubmit: 10,
  },
  {
    homeworkNum: "2",
    content: "作业内容",
    totalSubmit: 10,
  },
  {
    homeworkNum: "3",
    content: "作业内容",
    totalSubmit: 8,
  },
]);
function handleCorrect(row) {
  router.push({
    name: "correcting-homework-detail",
    params: { homeWorkId: row.homeworkNum },
  });
}
</script>

<style lang="scss" scoped>
.correcting-homework-detail {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
</style>
