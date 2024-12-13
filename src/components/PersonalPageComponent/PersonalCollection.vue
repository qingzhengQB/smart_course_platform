<template>
  <div class="note-container">
    <!-- 原有内容 -->
    <template v-if="!showOtherFavo">
      <template v-for="(item, index) in notes" :key="index">
        <div class="note-item-container">
          <div class="note-item">
            <div class="note-title" @click="goToPost(item.postId)">{{ item.postTitle }}</div>
            <div class="note-content">{{ item.content }}</div>
            <div class="course-name">来自课程{{ item.courseName }}</div>
            <div>点赞数 {{ item.likeNum }}</div>
            <div>收藏数 {{ item.favoNum }}</div>
            <div v-if="!isOther" class="delete-icon-container">
              <i
                class="fa-solid fa-trash-alt fa-icon-style fa-delete-icon-style"
                @click="deleteCollection(item.favoriteId)"
              ></i>
            </div>
            <div class="note-footer"></div>
          </div>
        </div>
        <div class="note-devide" v-if="index < notes.length "></div>
      </template>
      <template v-for="(item, index) in otherFavo" :key="'other-' + index">
        <div class="note-item-container">
          <div class="note-item">
            <div class="note-title" @click="goToOther(item.otherFavoNum,item.otherFavoName)">{{ item.otherFavoName }}</div>
            <div class="note-content">编号 {{ item.otherFavoNum }}</div>
            <div class="course-name">创建者{{ item.otherFavoCreaterName }}</div>
            <div v-if="!isOther" class="delete-icon-container">
              <i
                class="fa-solid fa-trash-alt fa-icon-style fa-delete-icon-style"
                @click="deleteCollection(item.favoriteId)"
              ></i>
            </div>
            <div class="note-footer"></div>
          </div>
        </div>
        <div class="note-devide" v-if="index < notes.length - 1"></div>
      </template>
    </template>

    <!-- 渲染选定收藏的内容 -->
    <template v-if="showOtherFavo">
      <div class="note-item-container">
        <div class="note-title">收藏夹：{{ selectedOtherFavoName }}</div>
        <template v-for="(content, index) in selectedOtherFavoContents" :key="index">
          <div class="note-item">
            <div class="note-title">{{ content.postTitle }}</div>
            <div class="note-content">{{ content.content }}</div>
            <div class="course-name">来自课程{{ content.courseName }}</div>
            <div>点赞数 {{ content.likeNum }}</div>
            <div>收藏数 {{ content.favoNum }}</div>
          </div>
          <div class="note-devide" v-if="index < selectedOtherFavoContents.length - 1"></div>
        </template>
        <button class="back-button" @click="backToFavoList">
        <i class="fa-solid fa-arrow-left"></i> 返回收藏夹列表
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getMyFavourite, deleteCollectionOfPostByPostId } from "@/api/PersonalApi";
import { useStore } from "vuex";
import router from "@/router";
const store = useStore();

// 使用 computed 获取 userNum
const userNum = computed(() => store.getters.getUserInfo.userNum);
const isOther = ref(window.location.pathname.startsWith("/other-personal")); // 是否是别人的主页
const notes = ref([]);
const otherFavo = ref([]);
const showOtherFavo = ref(false);
const selectedOtherFavoName = ref("");
const selectedOtherFavoContents = ref([]);

// 删除操作
const deleteCollection = async (favoriteId) => {
  try {
    const response = await deleteCollectionOfPostByPostId(favoriteId);
    console.log(response);
    fetchMyFavourites();
  } catch (error) {
    console.error("删除收藏失败", error);
  }
};

// 获取当前用户的收藏夹内容
const fetchMyFavourites = async () => {
  try {
    const response = await getMyFavourite(userNum.value);
    notes.value = response.postList;
    otherFavo.value = response.othersFavos;
  } catch (error) {
    console.error("获取收藏的帖子失败", error);
  }
};

// 获取选中收藏夹的内容
const fetchOthersFavorite = async (otherFavoNum,otherFavoName) => {
  try {
    const response = await getMyFavourite(otherFavoNum); // 替换为实际 API 调用
    selectedOtherFavoContents.value = response.postList;
    selectedOtherFavoName.value = otherFavoName;
    showOtherFavo.value = true;
  } catch (error) {
    console.error("获取收藏夹内容失败", error);
  }
};

// 切换到指定收藏夹的内容
const goToOther = async (otherFavoNum) => {
  try {
    await fetchOthersFavorite(otherFavoNum);
  } catch (error) {
    console.error("加载收藏夹内容失败", error);
  }
};

// 返回原收藏夹
const backToFavoList = () => {
  showOtherFavo.value = false;
  selectedOtherFavoContents.value = [];
  selectedOtherFavoName.value = "";
};
// 跳转帖子界面
const goToPost = (postId) => {
  router.push({ name: "discussion-detail", params: { id: postId } });
}
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
.back-button {
  display: flex;
  align-items: center;
  gap: 8px; /* 图标与文字间距 */
  font-size: 1rem;
  font-weight: bold;
  color: var(--main-color);
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 10px 15px;
  text-align: left; 
  transition: color 0.3s;
}

.back-button i {
  font-size: 1.2rem;
}

.back-button:hover {
  color: var(--secondary-color);
}
</style>
