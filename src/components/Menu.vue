<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
        active-text-color="#ffd04b"
        background-color="var(--main-color)"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup></script>

<!-- <script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const getChildRoutes = (routes, targetPath) => {
  for (const route of routes) {
    if (route.path === targetPath) {
      return route.children || [];
    }
    if (route.children) {
      const result = getChildRoutes(route.children, targetPath);
      if (result.length > 0) {
        return result;
      }
    }
  }
  return [];
};

const childRoutes = computed(() =>
  getChildRoutes(router.options.routes, "course/:id")
);
const activeMenu = ref(childRoutes[0]);
</script> -->

<style scoped>
.el-sub-menu__title:hover {
  background-color: var(--el-primary-color);
}
.el-menu-item:hover {
  background-color: var(--menu-hover-color);
}
.el-menu-vertical-demo {
  width: 200px;
  font-weight: bolder;
}
</style>
