<!-- TeacherInformation.vue -->
<template>
  <div class="teacherinformation">
    <h1>教师信息</h1>
    <form>
      <div class="form-row">
        <div class="form-group">
          <label for="name">姓名：</label>
          <input
            type="text"
            id="name"
            v-model="teacher.name"
            readonly
            class="readonly"
          />
        </div>
        <div class="form-group">
          <label for="unit">教学单位</label>
          <input
            type="text"
            id="unit"
            v-model="teacher.unit"
            readonly
            class="readonly"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="jobNumber">工号：</label>
          <input
            type="text"
            id="jobNumber"
            v-model="teacher.jobNumber"
            readonly
            class="readonly"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="phone">办公电话：</label>
          <input
            type="text"
            id="phone"
            v-model="teacher.phone"
            placeholder="如：010-88888888888"
            :readonly="!isTeacher"
            class="readonly"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="email">邮箱：</label>
          <input
            type="email"
            id="email"
            v-model="teacher.email"
            placeholder="如：123@qq.com"
            readonly
            class="readonly"
          />
        </div>
      </div>
      <div class="form-group full-width">
        <label for="bio">个人简介：</label>
        <textarea
          id="bio"
          v-model="teacher.bio"
          :readonly="!isTeacher"
          class="readonly no-resize"
        ></textarea>
      </div>
    </form>
    <div v-if="isTeacher" class="save-info">
      <el-button type="primary" @click="saveInfo" class="save-info-btn"
        >保存修改</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCourseTeacherInfo,setTeacherInfo } from "@/api/CoursePageApi";
import { useRoute } from "vue-router";
const isTeacher = ref(window.location.pathname.startsWith("/teacher-course/"));
const route = useRoute();
const courseId = route.params.id;
const teacher = ref({
  name: "",
  unit: "北京交通大学",
  jobNumber: "",
  email: "",
  phone:"",
  bio: "",
});
async function saveInfo() {
  try {
    // 调用 setTeacherInfo 提交教师信息
    await setTeacherInfo(courseId, teacher.value.phone, teacher.value.bio);
    
    // 打印教师信息到控制台
    console.log(teacher.value);

    // 获取并更新教师信息
    await fetchTeacherInfo();
  } catch (error) {
    console.error("保存教师信息失败：", error);
  }
}
// API 部分
const fetchTeacherInfo = async () => {
  try {
    const response = await getCourseTeacherInfo(courseId);
    teacher.value.name = response.teacher.name;          
    teacher.value.jobNumber = response.teacher.teacherNum;
    teacher.value.phone = response.teacher.phoneNum;
    teacher.value.bio = response.teacher_Info;
    teacher.value.email = teacher.value.jobNumber + "@bjtu.edu.cn";  
  } catch (error) {
    console.error("获取教师信息失败");
  }
};

onMounted(() => {
    fetchTeacherInfo();
});
</script>

<style scoped>
.teacherinformation {
  width: 100%; /* 设置组件的最大宽度 */
  height: 100%;
  margin: auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.form-group {
  width: 48%; /* 每个输入框占据宽度的48%，留有4%间距 */
}

.full-width {
  width: 100%; /* 个人简介占满整行 */
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select,
textarea {
  width: 100%;
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #f5f5f5;
  color: #999;
}

input[readonly],
select[disabled],
textarea[readonly] {
  background-color: #f5f5f5;
  color: #999;
}

textarea.no-resize {
  resize: none;
}

input[type="text"]:focus,
select:focus,
textarea:focus {
  border-color: #409eff;
  outline: none;
}

.save-info {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  width: 80vw;
}
/* .save-info-btn {
  width: 50px;
} */
</style>
