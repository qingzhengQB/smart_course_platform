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
        <span class="read-more" @click="goToDiscussionDetail(postItem.postId)"
          >阅读全文</span
        >
        <div v-if="isTeacher" class="post-delete-icon">
          <i
            class="fa-solid fa-trash-alt fa-icon-style fa-delete-icon-style"
          ></i>
        </div>
      </div>
      <div
        class="send-post-icon"
        @mousedown="startDrag"
        @click="handleSendPost"
        :style="iconStyle"
      >
        <i class="fa-solid fa-plus send-post-icon-content"></i>
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
import { getCourseDiscussion } from "@/api/CoursePageApi";
import { useStore } from "vuex";
const route = useRoute();
const router = useRouter();
const store = useStore();
const courseID = route.params.id;
const postList = ref([]);
const isTeacher = store.getters.getIsTeacher;
const sendPostDialogVisible = ref(false);
function goToDiscussionDetail(id) {
  console.log("go to discussion detail");
  router.push(
    `/${
      store.getters.getIsTeacher ? "teacher-course" : "course"
    }/${courseID}/discussion/${id}`
  );
}
const fetchDiscussion = async () => {
  try {
    const response = await getCourseDiscussion(courseID);
    postList.value = response.posts;
  } catch (error) {
    console.error("获取讨论失败", error);
  }
};

// 初始化拖动位置
const position = ref({ x: 30, y: 30 }); // 初始位置
let parentBounds = null; // 父容器边界
let dragging = false; // 是否处于拖动状态
function handleSendPost() {
  sendPostDialogVisible.value = true;
}

// 获取动态样式
const iconStyle = computed(() => ({
  bottom: `${position.value.y}px`,
  right: `${position.value.x}px`,
}));

// 开始拖动
const startDrag = (event) => {
  // 阻止默认行为
  event.preventDefault();

  // 获取父容器的边界
  if (!parentBounds) {
    const parent = event.currentTarget.parentElement;
    parentBounds = parent.getBoundingClientRect();
  }

  // 记录初始鼠标位置
  let startX = event.clientX;
  let startY = event.clientY;

  // 启用拖动状态
  dragging = true;

  // 鼠标移动处理
  const onMouseMove = (e) => {
    if (!dragging) return;

    // 计算鼠标的移动距离
    const deltaX = startX - e.clientX;
    const deltaY = startY - e.clientY;

    // 更新位置，同时限制在父容器边界内
    const newRight = Math.min(
      Math.max(position.value.x + deltaX, 0),
      parentBounds.width - 50 // 子元素宽度
    );
    const newBottom = Math.min(
      Math.max(position.value.y + deltaY, 0),
      parentBounds.height - 50 // 子元素高度
    );

    position.value.x = newRight;
    position.value.y = newBottom;

    // 更新起始鼠标位置
    startX = e.clientX;
    startY = e.clientY;
  };

  // 鼠标释放处理
  const onMouseUp = () => {
    dragging = false;

    // 移除全局事件监听
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  // 添加全局事件监听
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

onMounted(() => {
  parentBounds = null; // 防止边界数据错误
  fetchDiscussion();
});
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
</style>
