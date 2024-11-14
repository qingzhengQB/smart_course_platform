<template>
  <div class="n-container">
    <div class="x-notification-container">
      <div class="notice-table">
        <el-table :data="notificationList" style="width: 100%">
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
            :total="notificationList.length"
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
      <p> 发布时间：{{ currentNotificaiton.date }} {{ currentNotificaiton.time }}</p>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCourseNotification } from "../../../api/CoursePageApi"
import { useRoute } from 'vue-router'; // 导入 useRoute 钩子
 // 使用 useRoute 获取当前路由对象
 const route = useRoute();
 // 从 route.params 获取 courseId
const courseId = route.params.id;
console.log(courseId);
const notificationList = ref([]);
let currentNotificaiton = notificationList[0];

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

const fetchNotifications = async () => {
  try {
    const response = await getCourseNotification(courseId);
    notificationList.value = response.notifications.map(notification => {
      const [date, time] = notification.createTime.split('T');
      return {
        ...notification,
        date,
        time
      };
    });
  } catch (error) {
    console.error("获取通知失败", error);
  }
};

onMounted(() => {
  fetchNotifications();
});

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
