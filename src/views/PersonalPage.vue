<template>
  <div class="personal-container">
    <div class="personal-head">
      <div class="personal-cover-container">
      <img class="personal-cover" src="@/assets/head.png"></img></div>
      <div>
      <img class="personal-avatar" src="@/assets/avatar.png" alt="头像"></img>
      </div>
      <div class="personal-head-info">
        <div class="head-info">
          <div class="head-info-user-name">{{store.state.userinfo.name}}</div>
        </div>
      </div>
      
    </div>
    <div class="personal-page-container">
      <div class="left-part">
      <div class="personal-info-card">
        <div class="personal-info">
          <div class="info">
            <div class="info-user-name">{{store.state.userinfo.name}}</div>
            <div>{{store.state.userinfo.userNum}} @bjtu.edu.cn</div>
          </div>
        </div>
        <div class="personal-action">
          <el-button type="primary" @click="showEditDialog">修改密码
          </el-button>
        </div>
      </div>
      <button class="return-button" @click="() => router.push('/')" >
  <i class="icon-return" ></i>返回主页
</button>
    </div>
      <div class="personal-filter-card">
        <div class="personal-item-filter">
          <router-link
            v-for="(item, index) in personalItem"
            class="filter-direct"
            active-class="filter-direct-active"
            :to="item.url"
          >
            {{ item.item }}</router-link
          >
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
  <!-- 编辑个人资料 -->
  <el-dialog
    v-model="dialogVisible"
    title="编辑个人资料"
    width="30%"
  >
    <el-form :model="form" label-width="100px">
      <el-form-item label="新密码">
        <el-input v-model="form.password" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认新密码">
        <el-input v-model="form.confirmPassword" type="password" show-password></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleUpdate">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import router from "@/router";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import axios from "axios";
const route = useRoute();
const store = useStore();
const dialogVisible = ref(false)
const userNum = store.state.userinfo.userNum;
const personalInfo = {
  userName: "",
  email:"",
};
const form = ref({
  password: '',
  confirmPassword: ''
})

const showEditDialog = () => {
  dialogVisible.value = true
  form.value = {
    password: '',
    confirmPassword: ''
  }
}
store.commit("setPagename", "个人主页");
const isOther = window.location.pathname.startsWith("/other-personal"); // 是否是别人的主页
const otherId=isOther?route.params.id:"";
const baseURL=isOther?`/other-personal/${otherId}`:"/personal",menuNameBase=isOther?"他的":"我的";
const personalItem = [
  {
    item: `${menuNameBase}帖子`,
    url: `${baseURL}/question`,
  },
  {
    item: `${menuNameBase}回答`,
    url: `${baseURL}/answer`,
  },
  {
    item: `${menuNameBase}收藏`,
    url: `${baseURL}/collection`,
  },
  {
    item: `${menuNameBase}笔记`,
    url: `${baseURL}/note`,
  },
];
function returnHomePage(){
  router.push('/')
};
const handleUpdate = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    ElMessage.error('两次输入的密码不一致')
    return
  }
  
  try {
    const response = await axios.post('http://localhost:8000/student/update', null,{
      params: {
        studentNum: store.state.userinfo.userNum,
        password: form.value.password
      }
    })
    
    if (response.data.message === 'Update successful') {
      ElMessage.success('密码修改成功')
      dialogVisible.value = false
    } else {
      ElMessage.error('修改失败')
    }
  } catch (error) {
    ElMessage.error('修改失败：' + error.message)
  }
}
// 页面挂载时获取用户信息
onMounted(() => {
});
</script>

<style lang="scss" scoped>
@import "@/sheet.scss";
.personal-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3vh auto;
  gap: 20px;
}
.personal-head{
  height: 20vh;
  position: relative;
  width: 85vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  @include cardSheet;
}
.personal-cover-container{
  width: 100%;
  height: 50%;
}
.personal-cover{
  width: 100%;
  overflow: hidden;
  max-width: 100%;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  object-fit: cover;
  object-position: center;
}
.personal-head-info{
  height: 50%;
  width: 100%;
}
.head-info{
  display: absolute;
  justify-content: space-around;
  flex-direction: column;
  height: 80%;
  margin-left: 30%;
}
.head-info-user-name{
  font-size: 1.5rem;
  font-weight: bolder;
}
.personal-avatar{
  position: absolute;
  bottom: 30px;
  left: 30px;
  width: 12vh;
  height: 12vh;
}
.personal-page-container {
  width: 85vw;
  display: flex;
  justify-content: space-between;
  margin: auto;
}
.left-part{
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 25%;
}
.personal-info-card {
  width: 100%;
  @include cardSheet;
  height: 35vh;
}
.personal-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 20px 0 20px;
  flex-direction: column;
}
.personal-info .info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 150px;
}
.personal-info .info .info-user-name {
  font-weight: bolder;
  font-size: 1.5rem;
}
.personal-action {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.return-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 8vh;
  font-size: 1rem;
  font-weight: bold;
  background-color: #ffffff;
  border: 1px solid #d1cece;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #e0e0e0; // 鼠标悬浮时变灰
  }
  
  &:active {
    background-color: #d0d0d0; // 点击时变深
    transform: scale(0.98); // 添加点击缩放效果
  }
}
:root {
  --main-color: #5c9ea6;
  --font-color: #333;
  --main-border-color: #d1cece;
}


.icon-return{
  width: 20px;
  height: 20px;
  display: inline-block;
  background-size: cover;
}
.f-info{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.follower-info-devide{
  height: 100%;
  width: 3px;
  background-color: aliceblue;
}
.personal-filter-card {
  @include cardSheet;
  width: 74%;
}

.personal-item-filter {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 60%;
  margin: 20px 0;
  width: 100%;
  border-bottom: 2px solid var(--main-border-color);
}
.filter-direct {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  height: 30px;
  color: var(--font-color);
  transition: all 0.2s ease-in-out;
  
  &:hover {
    transform: scale(1.05); // 鼠标悬浮时轻微放大
    color: #5c9ea6; // 改变文字颜色
  }
}
.filter-direct::after {
  content: "";
  width: 20px;
  height: 3px;
  background-color: var(--main-color);
  /* border-radius: 50%; */
  opacity: 0;
}
.filter-direct-active::after {
  opacity: 1;
}
.icon-return {
  background-image: url('../assets/return.svg'); 
}
</style>
