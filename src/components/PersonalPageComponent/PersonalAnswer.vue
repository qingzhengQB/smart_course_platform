<template>
  <div class="answer-container">
    <template v-for="(item, index) in answers">
      <div class="answer-item-container">
        <div class="answer-item">
          <div class="answer-title">{{ `回答问题: ${item.title}` }}</div>
          <div class="answer-content">{{ `回答内容: ${item.content}` }}</div>
          <div class="answer-time">{{ item.time }}</div>
        </div>
      </div>
      <div class="answer-devide" v-if="index < answers.length - 1"></div>
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";
const answers = ref([
  {
    title: "问题1",
    content: "答案1内容",
    time: "2021-10-10",
  },
  {
    title: "问题2",
    content:
      "答案2内容长内容测试长内容测试长内容测试长内容测试长内容测试长内容测试长内容测试长内容测试长内容测试长内容测试长内容测试长内容测试长内容测试长内容测试长内容测试长内容测试长内容测试长内容测试长内容测试",
    time: "2021-10-11",
  },
  {
    title: "问题3",
    content: "答案3内容",
    time: "2021-10-12",
  },
]);
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
