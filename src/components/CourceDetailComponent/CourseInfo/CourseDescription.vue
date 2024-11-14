<!-- CourseDescription.vue -->
<template>
  <div class="course-description-container">
    <div class="coursedescription">
      <h1>课程简介</h1>
      <span>{{ description }}</span>
    </div>
    <div class="description-modify-button" v-if="isTeacher">
      <el-button class="modify-btn" type="primary" @click="handleModify"
        >修改</el-button
      >
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="修改课程描述" width="65vw">
    <div class="description-modify-container">
      <el-input
        type="textarea"
        v-model="description"
        placeholder="请输入课程描述"
        rows="10"
      ></el-input>
      <div class="description-modify-button" style="width: 100%">
        <el-button
          class="modify-btn"
          type="primary"
          @click="dialogVisible = false"
          >保存</el-button
        >
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCourseIntro } from "../../../api/CoursePageApi"
import { useRoute } from "vue-router";
const route = useRoute();
const isTeacher = ref(window.location.pathname.startsWith("/teacher-course/"));
const courseId = route.params.id;
const dialogVisible = ref(false);

const description = ref();
function handleModify() {
  dialogVisible.value = true;
}

const fetchCourseInfo = async () => {
  try {
    const response = await getCourseIntro(courseId);
    description.value = response.intro;
 } catch (error) {
  console.error("获取课程信息失败:", error);
}
};

onMounted(() => {
 fetchCourseInfo();
});
</script>

<style scoped>
.course-description-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.coursedescription {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 90%;
  height: 30vh;
}
.description-modify-button {
  margin-top: 30px;
  width: 90%;
  display: flex;
  justify-content: flex-end;
}
.modify-btn {
  margin-left: auto;
}
.coursedescription h1 {
  color: #333;
  font-size: 24px;
  font-weight: bold;
}

.coursedescription span {
  color: #666;
  font-size: 16px;
  line-height: 1.6;
  margin: 10px 0;
  white-space: pre-wrap;
}

.coursedescription p:first-child {
  margin-top: 20px;
}

.coursedescription p:last-child {
  margin-bottom: 0;
}
</style>
