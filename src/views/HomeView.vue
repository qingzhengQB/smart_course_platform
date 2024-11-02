<template>
  <div class="homeview-container">
    <div class="main-content-container">
      <!-- <div
        class="notification-container"
        @click="notificationDialogVisible = true"
      >
        <i class="fa-solid fa-bell"></i>
        <span class="notification">通知消息有{{ notificationList.length }}条</span>
      </div> -->
      <div class = "left-panel">
        <component :is="currentComponent" />
        <!-- <div class="course-container">
          <div class="course-item" v-for="(item, index) in courseList" :key="index">
            <div class="course-item-img">
              <img src="@/assets/courseCover.png" />
            </div>
            <div class="course-item-title">
              <span>{{ item.name }}</span>
            </div>
            <span class="course-id">{{ item.courseId }}</span>
            <div class="teacher-info">
              <span>讲师: {{ item.teacher.name }}</span>
              <span>教师编号: {{ item.teacher.teacherNum }}</span>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class = "right-panel">
      <UserInfo />
      <div class="notification-section">
        <button @click="toggleContent" class="notification-button">
          <i :class="iconClass"></i> {{ showNotifications ? "返回课程" : "查看通知" }}
        </button>
        <NotificationSummary v-if="!showNotifications" />
      </div>
    </div>
    
    <!-- <div class="side-content-container">
      <el-card class="box-card">
        <div class="card-content">
          <img src="@/assets/avatar.png" alt="avatar" />
          <div class="user-info">
            <el-tag
              :key="role"
              type="primary"
              effect="dark"
              class="role-tag"
              size="large"
            >
              {{ store.state.userinfo.role }}
            </el-tag>
            <span><strong>用户名: </strong>{{ store.state.userinfo.name }}</span>
          </div>
        </div>
      </el-card>
    </div> -->
  </div>

  <el-dialog v-model="notificationDialogVisible" title="通知列表" width="70vw">
    <div class="info-box">
      <el-table
        :data="paginatedData"
        :show-header="true"
        style="width: 100%"
        border
      >
        <el-table-column prop="content" label="通知内容" width="800" />
        <el-table-column prop="createTime" label="创建时间" width="200" />
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="notificationList.length"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handleCurrentChange"
        style="margin-top: 20px"
        class="page-divide"
      />
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { getCourses, getNotifications } from "../api/HomePageApi";
import UserInfo from "@/components/HomePage/UserInfo.vue";
import Notification from "@/components/HomePage/Notification.vue";
import CourseList from "@/components/HomePage/CourseList.vue";
import NotificationSummary from "@/components/HomePage/NotificationSummary.vue";
const store = useStore();
const notificationDialogVisible = ref(false);
const notificationList = ref([]);
const courseList = ref([]); 
const userNum = computed(() => store.state.userinfo.userNum);
const showNotifications = ref(false);
const iconClass = computed(() => showNotifications.value ? 'icon-return' : 'icon-notification');
// 根据showNotifications的值来决定显示哪个组件
const currentComponent = computed(() => {
  return showNotifications.value ? Notification : CourseList;
});

const toggleContent = () => {
  showNotifications.value = !showNotifications.value;
};

watch(userNum, (newValue) => {
  console.log('User Number:', newValue);
});

const fetchCourses = async () => {
  try {
    const response = await getCourses("852464");
    courseList.value = response.courses; 
    console.log(courseList.value);
  } catch (error) {
    console.error("获取课程失败:", error);
  }
};

const fetchNotifications = async () => {
  try {
    const response = await getNotifications("852464");
    notificationList.value = response.notifications;
    console.log(notificationList.value);
  } catch (error) {
    console.error("获取通知失败", error);
  }
};

onMounted(() => {
  fetchNotifications();
  fetchCourses();
});

const currentPage = ref(1);
const pageSize = ref(5);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return notificationList.value.slice(start, end);
});

const handleCurrentChange = (page) => {
  currentPage.value = page;
};
</script>

<style scoped>
.homeview-container {
  margin: 20px auto;
  width: 85%;
  display: flex;
  gap: 5px;
}

.main-content-container {
  width: 70%;
  border-radius: 10px;
  margin: 0 10px;
}

.notification-container {
  width: 100%;
  height: 5vh;
  font-weight: bolder;
  font-size: 1.2rem;
  border-radius: 10px;
  box-shadow: var(--main-border);
  transition: 0.3s;
  border: #e3e8f7 1px solid;
  display: flex;
  align-items: center;
  user-select: none;
  background-color: #fff;
}

.notification-container:hover {
  border: var(--el-color-primary) 1px solid;
  color: var(--el-color-primary);
}

.notification-container i {
  font-weight: normal;
  font-size: 1rem;
  margin: 0 10px;
}

.notification {
  font-weight: bolder;
}

.course-container {
  margin: 2vh 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
}

.course-item {
  border-radius: var(--main-border-radius);
  border: var(--main-border);
  overflow: hidden;
  transition: 0.3s;
  background-color: #fff;
  text-align: center;
}

.course-item:hover {
  box-shadow: var(--main-box-shadow);
  border-color: var(--main-color);
}

.course-item-img {
  width: 100%;
  height: 50%;
}

.course-item-img img {
  max-width: 100%;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  object-fit: cover;
  object-position: center;
}

.course-item-title {
  font-size: 25px;
  margin: 10px 0;
  font-weight: bolder;
}

.course-id {
  font-weight: bolder;
  font-size: 1.2rem;
}

.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-content img {
  margin: 10px 0;
  width: 25%;
  aspect-ratio: 1 / 1;
}

.user-info {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

.role-tag {
  font-size: 1rem;
}

.info-box {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.page-divide {
  margin: 10px 0;
}

.side-content-container {
  border-radius: 10px;
  margin: 0 10px;
  width: 28%;
}
/* 按钮样式 */
.notification-button {
  padding: 10px 20px; 
  border-radius: 20px; 
  border: 0;
  color: black;
  font-size: 16px;
  display: flex;
  align-items: center; 
  cursor: pointer; /* 鼠标悬停时显示指针 */
  transition: background-color 0.2s; 
}
.notification-button:hover {
  background-color: #d1cece; 
}

/* 图标样式 */
.icon-return, .icon-notification {
  width: 20px;
  height: 20px;
  display: inline-block;
  background-size: cover;
}

.icon-return {
  background-image: url('../assets/return.svg'); /* 替换为实际图标的URL */
}

.icon-notification {
  background-image: url('../assets/notification.svg'); /* 替换为实际图标的URL */
}
/* 左侧和右侧面板的样式 */
.left-panel {
  flex: 1;
  border-right: 1px solid #ccc;
  padding: 20px;
  overflow-y: auto; /* 允许内容滚动 */
  height: 100vh; /* 确保面板高度占满视口 */
}

.right-panel {
  width: 300px; /* 固定宽度 */
  padding: 20px;
  box-sizing: border-box; /* 包含内边距和边框在宽度内 */
  position: sticky;
  top: 0; /* 固定在顶部 */
  height: 100vh; /* 确保面板高度占满视口 */
  overflow-y: auto; /* 允许内容滚动 */
}
.notification-section {
  margin-top: 20px;
}
</style>
