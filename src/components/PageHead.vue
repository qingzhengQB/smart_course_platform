<template>
  <div class="head-container flex-row">
    <div class="head flex-row" @click="toHomePage">
      <span>{{ store.state.pagename }}</span>
    </div>
    <div class="head-user flex-row">
      <div class="user-greet flex-row">
        <div>欢迎您，</div>
        <div class="user-name">{{ store.state.userinfo.name }}</div>
      </div>
      <div class="user-avatar">
        <el-dropdown trigger="hover">
          <img
            class="user-avatar-img setupStyle"
            src="@/assets/avatar.png"
            alt="avatar"
          />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="toPersonalPage"
                >个人信息</el-dropdown-item
              >
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
function toPersonalPage() {
  router.push("/personal"); // 跳转到个人页面
}
function logout() {
  router.push("/login");
}
function toHomePage() {
  router.push("/");
}
</script>

<style scoped>
.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.head-container {
  justify-content: space-between;
  background-color: var(--main-color);
  user-select: none;
  cursor: pointer;
}

.head {
  height: var(--page-head-height);
  width: 100%;
  font-weight: bolder;
  font-size: 1.45rem;
  color: white;
}

.head span {
  margin-left: 2vw;
}

.head-user {
  color: white;
  width: 15vw;
  font-size: 1.1rem;
  justify-content: space-around;
}

.user-name {
  font-weight: bolder;
}

.user-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
}

.user-avatar-img {
  width: 65%;
  aspect-ratio: 1 / 1;
}
.setupStyle {
  outline: none;
}
</style>
