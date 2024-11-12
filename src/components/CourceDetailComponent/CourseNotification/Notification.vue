<template>
  <div class="n-container">
    <div class="x-notification-container">
      <div class="notice-table">
        <el-table :data="notices" style="width: 100%">
          <el-table-column prop="title" label="通知标题" width="500">
            <template v-slot="{ row }">
              <span>{{ row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="submissionTime" label="发布时间" width="565" />
          <el-table-column label="操作" width="100">
            <template v-slot="{ row }">
              <el-button type="text" @click="openSubmitDialog(row)"
                >详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页控件 -->
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
            :total="notices.length"
            :page-size="pageSize"
            :current-page.sync="currentPage"
            @current-change="handlePageChange"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="通知详情" v-model="dialogVisible" width="50%" center>
      <h2>{{ currentNotificaiton.title }}</h2>
      <p>{{ currentNotificaiton.content }}</p>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const notices = ref([
  {
    title: "通知1",
    submissionTime: "2024-11-06 21:50:46",
    content:
      "通知内容1111111111111111111111111111111111111111111111111111111111111111",
  },
  {
    title: "通知2",
    submissionTime: "2024-10-22 23:51:14",
    content: "通知内容2",
  },
]);
let currentNotificaiton = notices[0];

const pageSize = 5;
const currentPage = ref(1);

const dialogVisible = ref(false);

const openSubmitDialog = (row) => {
  console.log("Attempting to open submit dialog");
  currentNotificaiton = row;
  dialogVisible.value = true;

  console.log("Dialog visible status:", dialogVisible.value);
};

const handlePageChange = (page) => {
  currentPage.value = page;
};
</script>

<style scoped>
.n-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.x-notification-container {
  width: 93%;
}
.notice-table {
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
