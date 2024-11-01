<template>
  <div class="question-container">
    <template v-for="(item, index) in questions">
      <div class="question-item-container">
        <div class="question-item">
          <div class="question-title">{{ item.title }}</div>
          <div class="question-content">{{ item.content }}</div>
          <div class="question-likeNum">{{ item.likeNum }}</div>
        </div>
      </div>
      <div class="question-devide" v-if="index < questions.length - 1"></div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getPosts } from "../../api/PersonalApi";
//TODO 点赞数likenum待修改样式
const questions = ref([]);
//TODO vuex取出userNum
const fetchPosts = async () => {
  try {
    const response = await getPosts("852464");
    questions.value = response.posts;
    console.log(questions.value);
  } catch (error) {
    console.error("获取问题失败", error);
  }
}
onMounted(() => {
  fetchPosts();
});

</script>

<style scoped>
.question-container {
  margin: 20px 30px;
}
.question-item-container {
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.question-item {
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
}
.question-title {
  font-weight: bolder;
  font-size: 1.2rem;
  user-select: none;
  transition: 0.3s;
}
.question-title:hover {
  color: var(--main-color);
}
.question-content {
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
.question-devide {
  width: 100%;
  height: 2px;
  background-color: aliceblue;
}
</style>
