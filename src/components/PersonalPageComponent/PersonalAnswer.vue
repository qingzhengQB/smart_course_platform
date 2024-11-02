<template>
  <div class="answer-container">
    <template v-for="(item, index) in answers">
      <div class="answer-item-container">
        <div class="answer-item">
          <div class="answer-title">{{ `标题: ${item.postTitle}` }}</div>
          <div class="answer-user">你回复了 {{ item.commentedName }} </div>
          <div class="answer-content">{{ `回答内容: ${item.content}` }}</div>
        </div>
      </div>
      <div class="answer-devide" v-if="index < answers.length - 1"></div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getMyComments } from "@/api/PersonalApi";
import { useStore } from 'vuex';

const store = useStore();
// 使用 computed 获取 userNum
const userNum = computed(() => store.getters.getUserInfo.userNum);
const answers = ref([]);
const fetchMyComments = async () => {
  console.log(userNum);
  try {
    const response = await getMyComments(userNum.value);
    answers.value = response.commentList;
  } catch (error) {
    console.error("获取回复失败", error);
  }
}
onMounted(() => {
  fetchMyComments();
})
</script>

<style scoped>
.answer-container {
  margin: 20px 30px;
}
.answer-item-container {
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.answer-item {
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
}
.answer-title {
  font-weight: bolder;
  font-size: 1.2rem;
  user-select: none;
  transition: 0.3s;
}
.answer-title:hover {
  color: var(--main-color);
}
.answer-content {
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
.answer-devide {
  width: 100%;
  height: 2px;
  background-color: aliceblue;
}
</style>
