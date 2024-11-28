<template>
  <div class="course-container">
    <div
      class="course-item"
      v-for="(item, index) in courseList"
      :key="index"
      @click="openCourseDetail(item)"
    >
      <div class="course-item-img">
        <img :src="courseCover" alt="Course Cover" />
      </div>
      <div class="course-item-title">
        <span>{{ item.name }}</span>
      </div>
      <span class="course-id">课程编号: {{ item.courseId }}</span>
      <div class="teacher-info">
        <span>讲师: {{ item.teacher.name }}</span>
        <span>教师编号: {{ item.teacher.teacherNum }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useStore } from "vuex";

import { useRouter } from 'vue-router';
// 引入课程封面图片
const courseCover = require("@/assets/courseCover.png");

// 定义 props 接收父组件传递的数据
const props = defineProps({
  courseList: {
    type: Array,
    required: true,
  },
});

const store = useStore();


// 获取 router 实例
const router = useRouter();

// 跳转到相应的页面
const openCourseDetail = (item) => {
  const path = `/${
    store.getters.getIsTeacher ? "teacher-course" : "course"
  }/${item.courseId}?coursename=${item.name}`;
  
  // 使用 router.push 进行跳转
  router.push(path);
};
</script>

<style scoped>
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
  cursor: pointer; /* 鼠标悬停时显示指针 */
}

.course-item:hover {
  box-shadow: var(--main-box-shadow);
  border-color: var(--main-color);
}

.course-item-img {
  width: 100%;
  height: 150px; /* 固定高度 */
}

.course-item-img img {
  max-width: 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.course-item-title {
  font-size: 20px;
  margin: 10px 0;
  font-weight: bolder;
}

.course-id {
  font-weight: bolder;
  font-size: 1rem;
  color: #666;
  margin-bottom: 5px;
}

.teacher-info {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 10px;
}
</style>
