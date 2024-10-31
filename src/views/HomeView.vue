<template>
  <div class="homeview-container">
    <div class="main-content-container">
      <div
        class="notification-container"
        @click="notificationDialogVisible = true"
      >
        <i class="fa-solid fa-bell"></i>
        <span class="notification">{{ notificationList[0].info }}</span>
      </div>
      <div class="course-container">
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
      </div>
    </div>
    <div class="side-content-container">
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
            <span
              ><span style="font-weight: bolder">用户名: </span>
              {{ store.state.userinfo.name }}</span
            >
          </div>
        </div>
      </el-card>
    </div>
  </div>
  <el-dialog v-model="notificationDialogVisible" title="通知列表" width="70vw">
    <div class="info-box">
      <el-table
        :data="paginatedData"
        :show-header="false"
        :border="false"
        style="width: 100%"
      >
        <el-table-column prop="info" label="通知" width="800" />
        <el-table-column prop="date" label="日期" width="200" />
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

const store = useStore();
const notificationDialogVisible = ref(false);
const notificationList = ref([
  { info: "Welcome to the course platform", date: "2023-05-01" },
  { info: "这是一条测试通知", date: "2023-06-01" },
  { info: "this is a notification 2", date: "2023-06-02" },
  { info: "this is a notification 3", date: "2023-06-03" },
]);

const courseList = ref([]); // 使用 ref 来响应式更新课程列表
// TODO：登录若成功就应该存储用户账户进入store中方面后续调用，此处功能待完善
// 获取 userNum
const userNum = computed(() => store.state.userinfo.userNum); // 从 Vuex 中获取 userNum
// 观察 userNum 的变化
watch(userNum, (newValue) => {
  console.log('User Number:', newValue);
});

// 获取课程数据
const fetchCourses = async () => {
  try {
    // TODO: 此处userNum作为参数，但是vuex的存储似乎有bug，导致这里取出有误
    const response = await getCourses("852464"); // 传递 userNum 作为参数
    courseList.value = response.courses; // 更新课程列表
    console.log(courseList.value);
  } catch (error) {
    console.error("获取课程失败:", error);
  }
};

// 页面挂载时获取课程
onMounted(() => {
  fetchCourses();
});

// 分页相关数据
const currentPage = ref(1);
const pageSize = ref(5);

// 计算当前页的数据
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return notificationList.value.slice(start, end);
});

// 处理页码变化
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
  /* 3 列，等分为 1/3 宽度 */
  grid-gap: 10px;
  /* 网格间的间隙 */
  /* border: var(--main-border);
  box-shadow: var(--main-box-shadow);
  padding: 10px 15px; */
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
  /* 保持图片响应式 */
  height: 100%;
  /* 保持图片宽高比 */
  margin: 0 auto;
  padding: 0;
  object-fit: cover;
  /* 图片将被裁剪以填满容器，保持宽高比 */
  object-position: center;
  /* 图片居中 */
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
</style>
