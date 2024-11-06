<template>
    <div class="notification-bar">
        <NotificationList :data="notificationList" />
     </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { getNotifications } from "../../api/HomePageApi";
  import NotificationList from './NotificationList.vue'; 

const notificationList = ref([]);

const fetchNotifications = async () => {
  try {
    const response = await getNotifications("852464");
    notificationList.value = response.notifications.map(notification => {
      const [date, time] = notification.createTime.split('T');
      return {
        ...notification,
        date,
        time
      };
    });
  } catch (error) {
    console.error("获取通知失败", error);
  }
};

onMounted(() => {
  fetchNotifications();
});
</script>

<style scoped>
.notification-bar {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>