<template>
    <div class="notification-summary-container">
      <el-card class="box-card">
        <div class="card-content">
          <h3>通知概览</h3>
          <ul>
            <li v-for="notification in notificationList"  :key="notification.notificationId">
              {{ notification.content }} - {{ notification.date }}
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
    notificationList: {
      type: Array,
    }
  });

  </script>
  
  <style scoped>
  .notification-summary-container {
    margin-top: 20px;
  }
  
  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
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