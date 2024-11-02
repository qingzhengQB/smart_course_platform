<template>
  <div class="personal-container">
    <div class="personal-head">
      <div class="personal-cover-container">
      <img class="personal-cover" src="@/assets/head.png"></img></div>
      <div class="personal-head-info">
        <div class="head-info">
          <div class="head-info-user-name">{{store.state.userinfo.name}}</div>
        </div>
      </div>
      <img class="personal-avatar" src="@/assets/avatar.png" alt="头像"></img>
    </div>
    <div class="personal-page-container">
      <div class="left-part">
      <div class="personal-info-card">
        <div class="personal-info">
          <div class="info">
            <div class="info-user-name">{{store.state.userinfo.name}}</div>
            <div>{{store.state.userinfo.userNum}} @bjtu.edu.cn</div>
          </div>
        </div>
        <div class="personal-action">
          <el-button type="primary">编辑资料</el-button>
        </div>
      </div>
      <div class="followers-card">
        <div class="f-info follower-info">
          <div>正在关注</div>
          <div>{{ 666 }}</div>
        </div>
        <div class="follower-info-devide"></div>
        <div class="f-info followered-info">
          <div>关注者</div>
          <div>{{ 999 }}</div>
        </div>
      </div>
    </div>
      <div class="personal-filter-card">
        <div class="personal-item-filter">
          <router-link
            v-for="(item, index) in personalItem"
            class="filter-direct"
            active-class="filter-direct-active"
            :to="item.url"
          >
            {{ item.item }}</router-link
          >
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const personalInfo = {
  userName: "",
  email:"",
};

const personalItem = [
  {
    item: "我的帖子",
    url: "/personal/question",
  },
  {
    item: "我的回答",
    url: "/personal/answer",
  },
  {
    item: "我的收藏",
    url: "/personal/collection",
  },
  {
    item: "我的笔记",
    url: "/personal/note",
  },
];
// 页面挂载时获取用户信息
onMounted(() => {
  
});
</script>

<style lang="scss" scoped>
@import "@/sheet.scss";
.personal-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3vh auto;
  gap: 20px;
}
.personal-head{
  height: 20vh;
  position: relative;
  width: 85vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  @include cardSheet;
}
.personal-cover-container{
  width: 100%;
  height: 40%;
}
.personal-cover{
  width: 100%;
  overflow: hidden;
  max-width: 100%;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  object-fit: cover;
  object-position: center;
}
.personal-head-info{
  height: 60%;
  width: 100%;
}
.head-info{
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  height: 80%;
  margin-left: 20%;
}
.head-info-user-name{
  font-size: 1.5rem;
  font-weight: bolder;
}
.personal-avatar{
  position: absolute;
  bottom: 30px;
  left: 30px;
  width: 12vh;
  height: 12vh;
}
.personal-page-container {
  width: 85vw;
  display: flex;
  justify-content: space-between;
  margin: auto;
}
.left-part{
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 25%;
}
.personal-info-card {
  width: 100%;
  @include cardSheet;
  height: 35vh;
}
.personal-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 20px 0 20px;
  flex-direction: column;
}
.personal-info .info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 150px;
}
.personal-info .info .info-user-name {
  font-weight: bolder;
  font-size: 1.5rem;
}
.personal-action {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.followers-card{
  @include cardSheet;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 8vh;
  padding: 20px 0;
  text-align: center;
}
.f-info{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.follower-info-devide{
  height: 100%;
  width: 3px;
  background-color: aliceblue;
}
.personal-filter-card {
  @include cardSheet;
  width: 74%;
}
.personal-item-filter {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 60%;
  margin: 20px 0;
  width: 100%;
  border-bottom: 2px solid var(--main-border-color);
}
.filter-direct {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  height: 30px;
  color: var(--font-color);
}
.filter-direct::after {
  content: "";
  width: 20px;
  height: 3px;
  background-color: var(--main-color);
  /* border-radius: 50%; */
  opacity: 0;
}
.filter-direct-active::after {
  opacity: 1;
}
</style>
