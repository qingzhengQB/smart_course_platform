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
            :readonly="!isTeacher"
            class="readonly"
          />
        </div>
        <div class="form-group">
          <label for="unit">教学单位：</label>
          <input
            type="text"
            id="unit"
            v-model="teacher.unit"
            :readonly="!isTeacher"
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
            :readonly="!isTeacher"
            class="readonly"
          />
        </div>
        <div class="form-group">
          <label for="title">职称：</label>
          <select id="title" v-model="teacher.title" disabled class="readonly">
            <option value="教授">教授</option>
            <option value="副教授">副教授</option>
            <!-- 其他职称选项 -->
          </select>
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
        <div class="form-group">
          <label for="mobile">移动电话：</label>
          <input
            type="text"
            id="mobile"
            v-model="teacher.mobile"
            placeholder="11位有效数字"
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
            :readonly="!isTeacher"
            class="readonly"
          />
        </div>
        <div class="form-group">
          <label for="website">个人网址：</label>
          <input
            type="url"
            id="website"
            v-model="teacher.website"
            :readonly="!isTeacher"
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
import axios from "axios";
const isTeacher = ref(window.location.pathname.startsWith("/teacher-course/"));

const teacher = ref({
  name: "",
  unit: "",
  jobNumber: "",
  title: "",
  phone: "",
  mobile: "",
  email: "",
  bio: "",
  website: "",
});
function saveInfo() {
  console.log("save");
}
// // API 部分
// const fetchTeacherInfo = async () => {
//     try {
//         const response = await axios.get('/api/teacher/info');
//         const data = response.data;
//         teacher.value = {
//             name: data.name || 'N/A',
//             unit: data.unit || 'N/A',
//             jobNumber: data.jobNumber || 'N/A',
//             title: data.title || 'N/A',
//             phone: data.phone || 'N/A',
//             mobile: data.mobile || 'N/A',
//             email: data.email || 'N/A',
//             bio: data.bio || 'N/A',
//             website: data.website || 'N/A'
//         };
//     } catch (error) {
//         console.error("Failed to fetch teacher information:", error);
//     }
// };

// onMounted(() => {
//     fetchTeacherInfo();
// });
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
