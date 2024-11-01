<template>
    <div class="notification-bar">
      <el-tabs v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane label="评论和@" name="comments_mentions">
          <NotificationList :data="filteredNotifications" />
        </el-tab-pane>
        <el-tab-pane label="赞和收藏" name="likes_favorites">
          <NotificationList :data="filteredNotifications" />
        </el-tab-pane>
        <el-tab-pane label="新增关注" name="new_follows">
          <NotificationList :data="filteredNotifications" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { getNotifications } from "../../api/HomePageApi";
  import NotificationList from './NotificationList.vue'; 
  
  const activeTab = ref('comments_mentions');
  const notificationList = ref([]);
  
  const fetchNotifications = async () => {
    try {
      const response = await getNotifications("852464");
      notificationList.value = response.notifications;
    } catch (error) {
      console.error("获取通知失败", error);
    }
  };
  
  onMounted(() => {
    fetchNotifications();
  });
  
  const filteredNotifications = computed(() => {
    switch (activeTab.value) {
      case 'comments_mentions':
        return notificationList.value.filter(n => n.type === 'comment' || n.type === 'mention');
      case 'likes_favorites':
        return notificationList.value.filter(n => n.type === 'like' || n.type === 'favorite');
      case 'new_follows':
        return notificationList.value.filter(n => n.type === 'follow');
      default:
        return [];
    }
  });
  
  const handleTabClick = (tab) => {
    console.log(`Switched to tab: ${tab.name}`);
  };
  </script>
  
  <style scoped>
  .notification-bar {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .el-tabs {
    width: 100%;
  }
  
  .el-tab-pane {
    padding: 10px;
  }
  </style>