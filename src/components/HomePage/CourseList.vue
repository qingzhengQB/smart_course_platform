<template>
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
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getCourses } from "../../api/HomePageApi";
  
  const courseList = ref([]);
  
  const fetchCourses = async () => {
    try {
      const response = await getCourses("852464");
      courseList.value = response.courses;
    } catch (error) {
      console.error("获取课程失败:", error);
    }
  };
  
  onMounted(() => {
    fetchCourses();
  });
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
  </style>