<template>
    <div class="notifications">
      <div class="tabs">
        <button :class="{ active: activeTab === 'comments' }" @click="activeTab = 'comments'">评论和@</button>
        <button :class="{ active: activeTab === 'likes' }" @click="activeTab = 'likes'">赞和收藏</button>
        <button :class="{ active: activeTab === 'followers' }" @click="activeTab = 'followers'">新增关注</button>
      </div>
      <div v-if="activeTab === 'comments'" class="tab-content">
        <div v-for="(comment, index) in comments" :key="index" class="notification">
          <div class="avatar"></div>
          <div class="content">
            <div class="header">{{ comment.type }}</div>
            <div class="message">{{ comment.message }}</div>
            <div class="actions">
              <button @click="reply(comment)">回复</button>
              <span
                class="icon"
                :class="{ liked: comment.liked }"
                @click="toggleLike(comment)"
              >
              <i class="fa-solid fa-heart"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'likes'" class="tab-content">
        <div v-for="(like, index) in likes" :key="index" class="notification">
          <div class="avatar"></div>
          <div class="content">
            <div class="header">{{ like.type }}</div>
            <div class="message">{{ like.message }}</div>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'followers'" class="tab-content">
        <div v-for="(follower, index) in followers" :key="index" class="notification">
          <div class="avatar"></div>
          <div class="content">
            <div class="header">{{ follower.type }}</div>
            <div class="message">{{ follower.message }}</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeTab: 'comments',
        comments: [
          { type: '某某', message: '回复了你的评论', liked: false },
          { type: '某', message: '在评论中@了你', liked: false },
        ],
        likes: [
          { type: '点赞', message: '赞了你的动态 - 某个动态' },
          { type: '收藏', message: '收藏了你的评论' },
        ],
        followers: [
          { type: '某某', message: '开始关注你了' },
          { type: '某', message: '开始关注你了' },
        ],
      };
    },
    methods: {
      reply(comment) {
        console.log('Reply to:', comment);
      },
      toggleLike(comment) {
        // Toggle the 'liked' state
        comment.liked = !comment.liked;
        console.log(comment.liked ? 'Liked' : 'Unliked', comment);
      },
    },
  };
  </script>
  
  <style scoped>
  html, body {
    height: 100%;
    margin: 0;
  }
  
  .notifications {
    height: 100vh;
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    background-color: #f9f9f9;
    overflow-y: auto;
  }
  
  .tabs {
    display: flex;
    border-bottom: 1px solid #ccc;
    margin-bottom: 16px;
    gap: 10px;
  }
  
  .tabs button {
    flex: 1;
    padding: 10px;
    cursor: pointer;
    border: 1px solid transparent;
    background: none;
    font-weight: bold;
    transition: background-color 0.3s, border-color 0.3s;
  }
  
  .tabs .active {
    color: #42b983;
    border-bottom: 2px solid #42b983;
    border-color: #42b983;
  }
  
  .tab-content {
    padding: 10px 0;
  }
  
  .notification {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;
    padding: 16px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ececec;
    margin-right: 16px;
  }
  
  .content {
    flex: 1;
  }
  
  .header {
    font-weight: bold;
    margin-bottom: 4px;
    font-size: 14px;
    color: #333;
  }
  
  .message {
    margin-bottom: 8px;
    font-size: 13px;
    color: #666;
  }
  
  .actions button {
    margin-right: 8px;
    background-color: #42b983;
    border: none;
    color: #fff;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .actions button:hover {
    background-color: #369f72;
  }
  
  .icon {
    cursor: pointer;
    font-size: 16px;
    color: #ccc; /* Gray by default */
    transition: transform 0.2s, color 0.2s;
  }
  
  .icon.liked {
    color: #e0245e; /* Red when liked */
  }
  
  .icon:hover {
    transform: scale(1.1);
  }
  </style>
