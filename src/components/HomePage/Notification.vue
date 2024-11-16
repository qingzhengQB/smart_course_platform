<template>
    <div class="notification-bar">
        <NotificationList :data="notificationList" />
     </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { getNotifications,getNotificationsOfTeacher } from "../../api/HomePageApi";
  import NotificationList from './NotificationList.vue'; 
  import { useStore } from "vuex";
const store = useStore();
const notificationList = ref([]);
const userNum = computed(() => store.state.userinfo.userNum);
// Fetch notifications
const fetchNotifications = async () => {
  try {
    getNotificationsOfTeacher
    if (store.getters.getIsTeacher) {
      const response = await getNotificationsOfTeacher(userNum.value);
      notificationList.value = response.notifications.map(notification => {
      const [date, time] = notification.createTime.split('T');
      return {
        ...notification,
        date,
        time
      };
    });;
    } else {
      const response = await getNotifications(userNum.value);
      notificationList.value = response.notifications.map(notification => {
      const [date, time] = notification.createTime.split('T');
      return {
        ...notification,
        date,
        time
      };
    });
    }
    
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