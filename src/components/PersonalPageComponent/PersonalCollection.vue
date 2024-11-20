<template>
  <div class="note-container">
    <template v-for="(item, index) in notes">
      <div class="note-item-container">
        <div class="note-item">
          <div class="note-title">{{ item.postTitle }}</div>
          <div class="note-content">{{ item.content }}</div>
          <div class="course-name">来自课程{{ item.courseName }}</div>
          <div>点赞数 {{ item.likeNum }}</div>
          <div>收藏数 {{ item.favoNum }}</div>
          <div v-if="!isOther" class="delete-icon-container">
            <i
              class="fa-solid fa-trash-alt fa-icon-style fa-delete-icon-style"
            ></i>
          </div>
          <div class="note-footer"></div>
        </div>
      </div>
      <div class="note-devide" v-if="index < notes.length - 1"></div>
    </template>
    <template v-for="(item, index) in otherFavo">
      <div class="note-item-container">
        <div class="note-item">
          <div class="note-title">{{ item.otherFavoName }}</div>
          <div class="note-content">编号 {{ item.otherFavoNum }}</div>
          <div class="course-name">创建者{{ item.otherFavoCreaterName }}</div>
          <div class="note-footer"></div>
        </div>
      </div>
      <div class="note-devide" v-if="index < notes.length - 1"></div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getMyFavourite } from "@/api/PersonalApi";
import { useStore } from "vuex";
const store = useStore();
// 使用 computed 获取 userNum
const userNum = computed(() => store.getters.getUserInfo.userNum);
const isOther = ref(window.location.pathname.startsWith("/other-personal")); // 是否是别人的主页
const notes = ref([]);
const otherFavo = ref([]);
const fetchMyFavourites = async () => {
  try {
    const response = await getMyFavourite(userNum.value);
    notes.value = response.postList;
    otherFavo.value = response.othersFavos;
  } catch (error) {
    console.error("获取收藏的帖子失败", error);
  }
};
onMounted(() => {
  fetchMyFavourites();
});
</script>

<style scoped>
.note-container {
  margin: 20px 30px;
}
.note-item-container {
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.note-item {
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
}
.note-title {
  font-weight: bolder;
  font-size: 1.2rem;
  user-select: none;
  transition: 0.3s;
}
.note-title:hover {
  color: var(--main-color);
}
.note-content {
  color: var(--font-color);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  word-break: break-word;
}
.delete-icon-container {
  position: absolute;
  top: 20px;
  right: 20px;
}
.note-footer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 50px;
}
.note-author {
  user-select: none;
  transition: 0.3s;
  cursor: pointer;
}
.note-author:hover {
  color: var(--main-color);
}
.note-devide {
  width: 100%;
  height: 2px;
  background-color: aliceblue;
}
.fa-icon-style {
  cursor: pointer;
  transition: 0.3s;
}
.fa-icon-style:hover {
  color: var(--main-color);
}
.fa-delete-icon-style {
  font-size: 1.2rem;
}
</style>
