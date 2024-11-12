<template>
  <div class="course-discussion-container">
    <div class="discussion-container">
      <div
        v-for="(postItem, index) in postList"
        class="post-container"
        :id="`post-item-${index}`"
      >
        <div class="post-title">{{ postItem.title }}</div>
        <div class="post-author" style="font-size: 0.8rem">
          {{ postItem.author }}
        </div>
        <div class="post-content">{{ postItem.content }}</div>
        <span class="read-more">阅读全文</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const postList = ref([
  {
    title: "Post 1",
    author: "Author 1",
    content: "This is the content of post 1",
  },
  {
    title: "Post 2",
    author: "Author 2",
    content: "This is the content of post 2",
  },
  {
    title: "Post 3",
    author: "Author 3",
    content:
      "This is the content of post 3. 长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！长文本测试！",
  },
  {
    title: "Post 2",
    author: "Author 2",
    content: "This is the content of post 2",
  },
  {
    title: "Post 2",
    author: "Author 2",
    content: "This is the content of post 2",
  },
  {
    title: "Post 2",
    author: "Author 2",
    content: "This is the content of post 2",
  },
]);
</script>

<style scoped>
.course-discussion-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.discussion-container {
  overflow-y: auto;
  overflow-x: hidden;
  height: 88%;
  width: 90%;
  border: var(--main-border);
  box-shadow: var(--main-box-shadow);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.post-container {
  padding: 20px;
  border: var(--main-border-color) solid 3px;
  border-radius: var(--main-border-radius);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;
  background-color: #fff;
}
.post-container:hover .post-title {
  color: var(--main-color);
}
.post-title {
  font-size: 1.35rem;
  font-weight: bolder;
  transition: all 0.3s;
}
.post-content {
  display: -webkit-box;
  /* 使用 WebKit 盒模型 */
  -webkit-line-clamp: 2;
  line-clamp: 2;
  /* 限制最多显示两行 */
  -webkit-box-orient: vertical;
  /* 垂直方向排列 */
  overflow: hidden;
  /* 隐藏超出的内容 */
  text-overflow: ellipsis;
  /* 使用省略号显示溢出内容 */
  white-space: pre-wrap;
  /* 保留换行符，文本过长时会自动换行 */
  word-break: break-word;
}
.read-more {
  color: var(--menu-color-hover);
  cursor: pointer;
  margin-left: auto;
}
</style>
