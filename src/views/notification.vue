<template>
  <div class="notification-container">
    <!-- 框的标题 -->
    <div class="notification-title">
      <span>通知</span>
      <!-- 详情按钮 -->
      <button class="detail-button" @click="goToMul">详情</button>
    </div>
    <!-- 通知列表 -->
    <div class="notification-list">
      <div v-for="(item, index) in notifications" :key="index" class="notification">
        <!-- 每条通知的标题、日期和箭头图标 -->
        <div class="notification-header">
          <span>{{ item.title }}</span>
          <div class="notification-meta">
            <span class="notification-date">{{ item.date }}</span>
            <span class="arrow-icon" @click="toggleNotification(index)">
              <span v-if="item.showContent">▲</span>
              <span v-else>▼</span>
            </span>
          </div>
        </div>
        <!-- 每条通知的内容，根据 showContent 控制显示或隐藏 -->
        <div class="notification-content" v-show="item.showContent">
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: [
        { title: '通知 1', content: '去问人体一iu哦姐姐是纪念这位i我很少看wwwwwwwwwwwwwwwwwwwaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', date: '2024-10-31', showContent: false },
        { title: '通知 2', content: '通知 2 ', date: '2024-10-30', showContent: false },
        { title: '通知 3', content: '通知 3 ', date: '2024-10-29', showContent: false },
        // 更多通知可以继续添加
      ],
    };
  },
  methods: {
    toggleNotification(index) {
      this.notifications[index].showContent = !this.notifications[index].showContent;
    },
    goToMul() {
      // 使用 Vue Router 编程式导航跳转到 "mul" 页面
      this.$router.push({ name: 'mul' });
    },
  },
};
</script>

<style scoped>
/* 整个框的样式 */
.notification-container {
  width: 100%;
  max-width: 800px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  background-color: #f9f9f9;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

/* 框的标题样式 */
.notification-title {
  padding: 15px;
  font-size: 18px;
  font-weight: bold;
  background-color: #007bff;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 详情按钮样式 */
.detail-button {
  background-color: #ff9800;
  border: none;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.detail-button:hover {
  background-color: #e68900;
}

/* 通知列表样式 */
.notification-list {
  padding: 10px;
}

/* 每条通知的样式 */
.notification {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}

/* 通知标题和元数据的布局 */
.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
}

/* 日期和箭头的容器 */
.notification-meta {
  display: flex;
  align-items: center;
}

/* 通知日期样式 */
.notification-date {
  font-size: 12px;
  color: #888;
  margin-right: 10px;
}

/* 箭头图标样式 */
.arrow-icon {
  cursor: pointer;
}

/* 通知内容的样式，添加自动换行 */
.notification-content {
  padding: 10px 0;
  font-size: 14px;
  color: #555;
  white-space: pre-wrap; /* 保留换行 */
  word-wrap: break-word; /* 自动换行 */
}
</style>
