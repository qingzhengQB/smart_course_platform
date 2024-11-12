<!-- CourseDescription.vue -->
<template>
    <div class="coursedescription">
      <h1>课程简介</h1>
      <p>这是一个课程，旨在帮助学生。</p>
      <p>课程大纲涵盖了等重要知识点。</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
//   const course = ref({
//     name: '课程名称', 
//     description: '这是一个关于课程主题的课程，旨在帮助学生掌握课程目标。', 
//     courseId: 'C0001',
//     teacher: {
//       name: '讲师姓名', 
//       teacherNum: '教师编号' 
//     },
//   });
  
  // 注释掉API获取数据的逻辑
  // const fetchCourseInfo = async () => {
  //   try {
  //     const response = await getCourseInfo(course.value.id);
  //     course.value = response.course;
  //  } catch (error) {
  //   console.error("获取课程信息失败:", error);
  // }
  // };
  
  // onMounted(() => {
  //  fetchCourseInfo();
  // });
  </script>
  
  <style scoped>
.coursedescription {
  border: 1px solid #ccc; 
  padding: 20px;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 90%;
  height: 50%;

}

.coursedescription h1 {
  color: #333;
  font-size: 24px;
  font-weight: bold;
}

.coursedescription p {
  color: #666;
  font-size: 16px;
  line-height: 1.6;
  margin: 10px 0;
}

.coursedescription p:first-child {
  margin-top: 20px;
}

.coursedescription p:last-child {
 margin-bottom: 0;
}
</style>