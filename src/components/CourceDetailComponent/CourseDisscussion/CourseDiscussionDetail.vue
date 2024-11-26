<template>
  <div class="discussion-detail-container">
    <div class="discussion-detail">
      <div class="discussion-detail-inner-container">
        <div class="discussion-title">{{ postDetail[0]?.title }}</div>
        <div class="discussion-info-container">
          <div class="discussion-author-container">
            <div class="discussion-author-avatar">
              <img class="user-avatar" src="@/assets/avatar.png" alt="avatar" />
            </div>
            <div class="discussion-author">{{ postDetail[0]?.studentName }}</div>
          </div>
        </div>
        <div class="discussion-content-container">
          {{ postDetail[0]?.content }}
        </div>
        <div class="discussion-stats-container">
          点赞数： {{ postDetail[0]?.likeNum }} 收藏数：{{ postDetail[0]?.favoNum }}
          <button class="comment-button" @click="showCommentForm = true">评论</button>
        </div>
        <div v-if="showCommentForm" class="comment-form-container">
          <textarea v-model="newComment.content" placeholder="写下您的评论..." class="comment-form-textarea"></textarea>
          <div class="comment-form-buttons">
            <button @click="submitComment" class="comment-submit-button">提交评论</button>
            <button @click="showCommentForm = false" class="comment-cancel-button">取消</button>
          </div>
        </div>
        <div class="discussion-comment-container">
          <div v-for="(commentItem, index) in postComment" class="single-comment">
            <div class="comment-content-container">
              <div class="main-comment-container">
                <div class="comment-row-container">
                  <div class="comment-author-container">
                    <div class="comment-author-avatar">
                      <img class="user-avatar" src="@/assets/avatar.png" alt="avatar" />
                    </div>
                    <div class="comment-author">
                      {{ commentItem.studentName !== null ? commentItem.studentName : commentItem.teacherName }} 回复 {{ commentItem.commentedName }}
                    </div>
                  </div>
                  <div class="comment-options-container">
                    <div class="comment-likes">
                      <i v-if="commentItem.isLiked" class="fa-solid fa-thumbs-up liked" @click="clickDisLike(commentItem)"></i>
                      <i v-else class="fa-regular fa-thumbs-up" @click="clickLike(commentItem)"></i>
                      <span class="like-count">{{ commentItem.likeNum }}</span>
                    </div>
                    <i class="fa-regular fa-comment" @click="openReplyForm(index)"></i>
                  </div>
                </div>
                <div class="comment-content">
                  {{ commentItem.content }}
                </div>
                <div v-if="replyFormIndex === index" class="reply-form-container">
                  <textarea v-model="replyComment.content" placeholder="回复评论..." class="comment-form-textarea"></textarea>
                  <div class="comment-form-buttons">
                    <button @click="submitReply()" class="comment-submit-button">提交回复</button>
                    <button @click="closeReplyForm" class="comment-cancel-button">取消</button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="index !== postComment.length - 1" class="comment-divider"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from 'vuex';
import { getCoursePostDetial, commentLike, commentDisLike, submitPostComment, submitCommentReply } from "@/api/CoursePageApi";
const store = useStore();
  // 使用 computed 获取 userNum
const userNum = computed(() => store.getters.getUserInfo.userNum);
const route = useRoute();
const postId = route.params.id;
const postDetail = ref({});
const postComment = ref([]);
const showCommentForm = ref(false);
const newComment = ref({ content: "" });
const replyComment = ref({ content: "" });
const replyFormIndex = ref(null);

const fetchPostDetails = async () => {
  console.log("尝试获取帖子详情");
  const response = await getCoursePostDetial(postId);
  postDetail.value = response.postDetial;
  postComment.value = response.postComments;
};

const clickLike = async (commentItem) => {
  commentItem.isLiked = !commentItem.isLiked;
  await commentLike(commentItem.commentId);
  commentItem.likeNum++;
};

const clickDisLike = async (commentItem) => {
  commentItem.isLiked = !commentItem.isLiked;
  await commentDisLike(commentItem.commentId);
  commentItem.likeNum--;
};

const submitComment = async () => {
  if (newComment.value.content.trim() !== "") {
    try {
      console.log(postId)
      await submitPostComment(postId, newComment.value.content,userNum.value);
      await fetchPostDetails();
      showCommentForm.value = false;
      newComment.value = { content: "" };
    } catch (error) {
      console.error("提交评论失败", error);
    }
  } else {
    alert("评论内容不能为空！");
  }
};

const openReplyForm = (index) => {
  replyFormIndex.value = index;
};

const closeReplyForm = () => {
  replyFormIndex.value = null;
  replyComment.value = { content: "" };
};

const submitReply = async () => {
  if (replyComment.value.content.trim() !== "") {
    try {
      await submitPostComment(postId, replyComment.value.content,userNum.value);
      await fetchPostDetails();
      closeReplyForm();
    } catch (error) {
      console.error("提交回复失败", error);
    }
  } else {
    alert("回复内容不能为空！");
  }
};

onMounted(() => {
  fetchPostDetails();
});
</script>

<style scoped>
.discussion-detail-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  background-color: #f9f9f9;
}
.discussion-detail {
  width: 95%;
  height: 95%;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.discussion-detail-inner-container {
  height: 95%;
  width: 95%;
  overflow-y: auto;
  overflow-x: hidden;
}
.discussion-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}
.discussion-info-container {
  display: flex;
  gap: 10px;
  margin: 10px 0;
  flex-direction: column;
}
.discussion-author-container {
  display: flex;
  gap: 10px;
  align-items: center;
}
.discussion-author-avatar,
.comment-author-avatar,
.user-avatar {
  height: 3rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  border: 1px solid #ddd;
}
.discussion-content-container {
  font-size: 1.1rem;
  width: 97%;
  margin: 20px 0;
  padding: 15px;
  background-color: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
}
.discussion-stats-container {
  font-size: 1rem;
  color: #666;
  margin-bottom: 20px;
}
.comment-devide-line {
  height: 1px;
  width: 100%;
  background-color: #cfcfcf;
}
.comment-row-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.comment-content-container {
  padding: 15px;
  border-radius: 10px;
  background-color: #f4f4f4;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
}
.main-comment-container {
  width: 100%;
}
.comment-author {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}
.comment-content {
  margin-top: 10px;
  font-size: 1rem;
  color: #555;
  padding-left: 15px;
}
.comment-options-container {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-right: 20px;
}
.comment-likes {
  display: flex;
  align-items: center;
  gap: 5px;
}
.liked {
  color: #ff5722;
}
.like-count {
  font-size: 0.9rem;
  color: #888;
}
.comment-divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 10px 0;
}
.comment-button {
  padding: 8px 16px;
  background-color: rgb(47, 98, 208);
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-left: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.comment-button:hover {
  background-color: #0056b3;
}
.comment-form-container {
  width: 100%;
  margin-bottom: 20px;
}
.comment-form-textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 1rem;
  box-sizing: border-box;
}
.comment-form-buttons {
  display: flex;
  gap: 10px;
}
.comment-submit-button {
  padding: 8px 16px;
  background-color: rgb(47, 98, 208);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.comment-submit-button:hover {
  background-color: #0056b3;
}
.comment-cancel-button {
  padding: 8px 16px;
  background-color: #ab2b38;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.comment-cancel-button:hover {
  background-color: #c82333;
}
.reply-form-container {
  width: 100%;
  margin-top: 10px;
}
</style>
