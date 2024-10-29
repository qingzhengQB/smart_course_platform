<template>
  <div class="content">
    <div class="menu">
      <Menu />
    </div>
    <div class="content-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import Menu from "@/components/Menu.vue";
const store = useStore();
const courseinfo = {
  name: "Course 1",
  description: "This is a course about something",
  no: 10001,
};

store.commit("setPagename", courseinfo.name);
</script>

<style scoped>
.content {
  display: flex;
  width: 100%;
  height: calc(100vh - var(--page-head-height));
}
.menu {
  background-color: var(--menu-color);
}
/* .menu {
  height: 100%;
  width: 200px;
} */
.el-menu-vertical-demo {
  width: 220px;
  min-height: 100%;
  border: none;
}
.el-menu-item {
  font-weight: bolder;
  font-size: 1.2rem;
}
.el-menu-item:hover {
  background-color: var(--el-color-primary);
}
.el-menu-item.is-active {
  background-color: var(--main-page-bg); /* 悬停时的背景颜色 */
  color: #409eff; /* 悬停时的文字颜色 */
  border: none;
}
.el-menu-item.is-active ~ .el-menu-item {
  border-bottom-right-radius: 5px;
  overflow: hidden;
}
.el-menu-item.is-active + .el-menu-item {
  border-top-right-radius: 5px;
  overflow: hidden;
}
</style>
