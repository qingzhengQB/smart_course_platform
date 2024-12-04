<template>
  <div class="course-discussion-container">
    <div class="discussion-header">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索讨论..."
        class="discussion-search"
      />
      <button @click="showPostForm = true" class="discussion-ask-button">
        提问
      </button>
    </div>
    <div class="discussion-container">
      <div
        v-for="(postItem, index) in filteredPostList"
        class="post-container"
        :id="`post-item-${index}`"
      >
        <div class="post-title">{{ postItem.title }}</div>
        <div class="post-author" style="font-size: 0.8rem">
          {{ postItem.author }}
        </div>
        <div
          class="post-content"
          v-html="formatPostContent(postItem.content)"
        ></div>
        <span class="read-more" @click="goToDiscussionDetail(postItem.postId)"
          >阅读全文</span
        >
        <div v-if="isTeacher" 
        class="post-delete-icon"
        >
          <i
            class="fa-solid fa-trash-alt fa-icon-style fa-delete-icon-style"
            @click="deletePost(postItem.postId)"
          ></i>
        </div>
      </div>
      <div
        class="send-post-icon"
        @mousedown="startDrag"
        @click="showPostForm=true"
        :style="iconStyle"
      >
        <i class="fa-solid fa-plus send-post-icon-content"></i>
      </div>
    </div>

    <!-- 发布评论的表单 -->
    <div v-if="showPostForm" class="post-form-overlay">
      <div class="post-form">
        <h3>发布评论</h3>
        <input
          v-model="newPost.title"
          type="text"
          placeholder="标题"
          class="post-form-title"
        />
        <textarea
          v-model="newPost.content"
          placeholder="写下您的评论... "
          class="post-form-content post-form-textarea"
        ></textarea>
        <input
          type="file"
          @change="handleFileUpload"
          class="post-form-file-input"
          accept="image/*"
        />
        <div class="post-form-buttons">
          <button @click="submitPost" class="post-submit-button">提交</button>
          <button @click="showPostForm = false" class="post-cancel-button">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="sendPostDialogVisible" title="发表讨论" width="80%">
    <el-form>
      <el-form-item label="标题">
        <el-input v-model="postTitle"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="postContent" :rows="12"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="el-dialog-footer">
          <el-button type="primary" @click="sendPost">发表</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import {
  getCourseDiscussion,
  submitNewDiscussionPost,
  submitNewDiscussionPostByTeacher,
  deletePostByTeacher,
} from "@/api/CoursePageApi";
import { useStore } from "vuex";
const route = useRoute();
const router = useRouter();
const store = useStore();
const courseID = route.params.id;
const postList = ref([]);
const isTeacher = store.getters.getIsTeacher;
const searchQuery = ref("");
const showPostForm = ref(false);
const newPost = ref({ title: "", content: "" });
// 使用 computed 获取 userNum
const userNum = computed(() => store.getters.getUserInfo.userNum);
function goToDiscussionDetail(id) {
  router.push(
    `/${
      store.getters.getIsTeacher ? "teacher-course" : "course"
    }/${courseID}/discussion/${id}`
  );
}
async function deletePost(id) {
  try {
    await deletePostByTeacher(id);
     // 延迟 0.5 秒后刷新页面
     setTimeout(() => {
      fetchDiscussion();
    }, 500);
  } catch (error) {
    console.error("帖子删除失败");
  }
}
const fetchDiscussion = async () => {
  try {
    const response = await getCourseDiscussion(courseID);
    postList.value = response.posts;
  } catch (error) {
    console.error("获取讨论失败", error);
  }
};

const submitPost = async () => {
  if (newPost.value.title && newPost.value.content) {
    if (store.getters.getIsTeacher) {
      try {
      const response = await submitNewDiscussionPostByTeacher(
        courseID,
        newPost.value,
        userNum.value
      );
      console.log(response);
      if (response.message == "帖子发送成功") {
        showPostForm.value = false;
        newPost.value = { title: "", content: "" };
      }
      fetchDiscussion();
    } catch (error) {
      console.error("发布评论失败", error);
    }
    } else {
      try {
      const response = await submitNewDiscussionPost(
        courseID,
        newPost.value,
        userNum.value
      );
      console.log(response);
      if (response.message == "帖子发送成功") {
        showPostForm.value = false;
        newPost.value = { title: "", content: "" };
      }
      fetchDiscussion();
    } catch (error) {
      console.error("发布评论失败", error);
    }
    }
  } else {
    alert("请填写完整的标题和内容！");
  }
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newPost.value.content += `\n![图片](${e.target.result})`;
    };
    reader.readAsDataURL(file);
  }
};

const formatPostContent = (content) => {
  return content
    .replace(/@([\w-]+)/g, '<span class="mention">@$1</span>')
    .replace(/#([\w-]+)/g, '<span class="hashtag">#$1</span>')
    .replace(
      /!\[图片\]\((.*?)\)/g,
      '<img src="$1" alt="图片" class="inserted-image" />'
    );
};

onMounted(() => {
  // parentBounds = null; // 防止边界数据错误
  fetchDiscussion();
});

const filteredPostList = computed(() => {
  return postList.value.filter(
    (post) =>
      post.title.includes(searchQuery.value) ||
      post.content.includes(searchQuery.value)
  );
});
</script>

<style scoped>
.course-discussion-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.discussion-header {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.discussion-search {
  width: 70%;
  padding: 12px;
  border-radius: 25px;
  border: 1px solid var(--main-border-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}
.discussion-search:focus {
  outline: none;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
.discussion-ask-button {
  padding: 12px 24px;
  background-color: var(--main-color);
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}
.discussion-ask-button:hover {
  background-color: var(--menu-color-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
.discussion-container {
  overflow-y: auto;
  overflow-x: hidden;
  height: 80%;
  width: 90%;
  border: var(--main-border);
  box-shadow: var(--main-box-shadow);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
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
  position: relative;
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
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  word-break: break-word;
}
.read-more {
  color: var(--menu-color-hover);
  cursor: pointer;
  margin-left: auto;
}
.post-delete-icon {
  position: absolute;
  top: 20px;
  right: 20px;
}

.send-post-icon {
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 30px;
  right: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background-color: var(--main-color);
  cursor: pointer;
}
.send-post-icon-content {
  font-size: 1.5rem;
  color: #fff;
}

.el-dialog-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}
.fa-icon-style {
  cursor: pointer;
  transition: 0.3s;
}
.fa-icon-style:hover {
  color: var(--main-color);
}
.fa-delete-icon-style {
  font-size: 1rem;
}
.post-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.post-form {
  background: #fff;
  padding: 20px;
  border-radius: var(--main-border-radius);
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.post-form-title,
.post-form-content {
  width: 100%;
  padding: 12px;
  border-radius: 15px;
  border: 1px solid var(--main-border-color);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;
}
.post-form-title:focus,
.post-form-content:focus {
  outline: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
.post-form-file-input {
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid var(--main-border-color);
}
.post-form-buttons {
  display: flex;
  justify-content: space-between;
}
.post-submit-button,
.post-cancel-button {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}
.post-submit-button {
  background-color: var(--main-color);
  color: #fff;
}
.post-submit-button:hover {
  background-color: var(--menu-color-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
.post-cancel-button {
  background-color: #ccc;
}
.post-cancel-button:hover {
  background-color: #aaa;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
.post-form-textarea {
  min-height: 100px;
}
.mention {
  color: var(--main-color);
  font-weight: bold;
}
.hashtag {
  color: var(--menu-color-hover);
  font-weight: bold;
}
.inserted-image {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
