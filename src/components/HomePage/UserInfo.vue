<template>
    <div class="user-info-container">
      <el-card class="box-card">
        <div class="card-content">
          <img src="@/assets/avatar.png" alt="avatar" />
          <div class="user-info">
            <el-tag
              :key="role"
              type="primary"
              effect="dark"
              class="role-tag"
              size="large"
            >
              {{ role }}
            </el-tag>
            <span><strong>用户名: </strong>{{ name }}</span>
          </div>
        </div>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const role = computed(() => store.state.userinfo.role);
  const name = computed(() => store.state.userinfo.name);
  </script>
  
  <style scoped>
  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .card-content img {
    margin: 10px 0;
    width: 25%;
    aspect-ratio: 1 / 1;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
  }
  
  .role-tag {
    font-size: 1rem;
  }
  </style>