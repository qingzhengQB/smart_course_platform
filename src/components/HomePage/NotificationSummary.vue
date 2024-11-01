<template>
    <div class="notification-summary-container">
      <el-card class="box-card">
        <div class="card-content">
          <h3>通知概览</h3>
          <ul>
            <li v-for="(notification, index) in recentNotifications" :key="index">
              {{ notification.content }} - {{ formatDate(notification.createTime) }}
            </li>
          </ul>
        </div>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { defineProps } from 'vue';
  
  const props = defineProps({
    notifications: {
      type: Array,
      default: () => []
    }
  });
  
  // 计算最近的通知
  const recentNotifications = computed(() => {
    return props.notifications.slice(0, 5); // 只显示最近的5条通知
  });
  
  // 格式化日期
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  </script>
  
  <style scoped>
  .notification-summary-container {
    margin-top: 20px;
  }
  
  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .notification-summary h3 {
    margin-bottom: 10px;
  }
  
  .notification-summary ul {
    list-style-type: none;
    padding: 0;
  }
  
  .notification-summary li {
    margin-bottom: 5px;
  }
  </style>