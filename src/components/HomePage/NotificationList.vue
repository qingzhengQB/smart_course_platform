<template>
    <el-table :data="data" style="width: 100%">
      <el-table-column prop="content" label="内容" />
      <el-table-column prop="createTime" label="时间" />
    </el-table>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    data: Array
  });
  </script>