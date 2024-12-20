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
            <div class="discussion-author">
              {{ postDetail[0]?.studentName }}
            </div>
          </div>
        </div>
        <div class="discussion-content-container">
          {{ postDetail[0]?.content }}
        </div>
        <div class="discussion-stats-container">
          点赞数： {{ postDetail[0]?.likeNum }} 收藏数：{{ postDetail[0]?.favoNum }}
          <button class="comment-button" @click="showCommentForm = true">
            评论
          </button>
        </div>
        <div v-if="showCommentForm" class="comment-form-container">
          <textarea
            v-model="newComment.content"
            placeholder="写下您的评论..."
            class="comment-form-textarea"
          ></textarea>
          <div class="comment-form-buttons">
            <button @click="submitComment" class="comment-submit-button">
              提交评论
            </button>
            <button @click="showCommentForm = false" class="comment-cancel-button">
              取消
            </button>
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
                      {{ commentItem.studentName !== null ? commentItem.studentName : commentItem.teacherName }}
                      回复 {{ commentItem.commentedName }}
                    </div>
                  </div>
                  <div class="comment-options-container">
                    <div class="comment-likes">
                      <i
                        v-if="commentItem.isLiked"
                        class="fa-solid fa-thumbs-up liked"
                        @click="clickDisLike(commentItem)"
                      ></i>
                      <i
                        v-else
                        class="fa-regular fa-thumbs-up"
                        @click="clickLike(commentItem)"
                      ></i>
                      <span class="like-count">{{ commentItem.likeNum }}</span>
                    </div>
                    <i class="fa-regular fa-comment" @click="openReplyForm(index)"></i>
                  </div>
                </div>
                <div class="comment-content">
                  {{ commentItem.content }}
                </div>
                <div v-if="replyFormIndex === index" class="reply-form-container">
                  <textarea
                    v-model="replyComment.content"
                    placeholder="回复评论..."
                    class="comment-form-textarea"
                  ></textarea>
                  <div class="comment-form-buttons">
                    <button @click="submitReply" class="comment-submit-button">
                      提交回复
                    </button>
                    <button @click="closeReplyForm" class="comment-cancel-button">
                      取消
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="index !== postComment.length - 1" class="comment-divider"></div>
          </div>
        </div>
        <div class="post-options-container-row">
          <div class="post-options-container">
            <div class="single-option-container">
              <i
                v-if="isLikePost"
                class="fa-solid fa-thumbs-up post-like"
                @click="LikePost"
              ></i>
              <i v-else class="fa-regular fa-thumbs-up" @click="LikePost"></i>
            </div>
            <div class="single-option-container">
              <i
                v-if="isCollectPost"
                class="fa-solid fa-star"
                @click="FavorPost"
              ></i>
              <i v-else class="fa-regular fa-star" @click="FavorPost"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import {
  getCoursePostDetial,
  commentLike,
  commentDisLike,
  submitPostComment,
  submitPostCommentByTeacher,
  postLike,
  postFavor,
  postDisLike,
  postUnFavor
} from "@/api/CoursePageApi";
const store = useStore();
const userNum = computed(() => store.getters.getUserInfo.userNum);
const route = useRoute();
const postId = route.params.id;
const postDetail = ref({});
const postComment = ref([]);
const showCommentForm = ref(false);
const newComment = ref({ content: "" });
const replyComment = ref({ content: "" });
const replyFormIndex = ref(null);
const isLikePost = ref(false);
const isCollectPost = ref(false);

const fetchPostDetails = async () => {
  const response = await getCoursePostDetial(postId);
  postDetail.value = response.postDetial;
  postComment.value = response.postComments;
  isLikePost.value = response.postDetial.isLiked;  // 根据返回的详情设置点赞状态
  isCollectPost.value = response.postDetial.isFavorited;  // 根据返回的详情设置收藏状态
};

const clickLike = async (commentItem) => {
  commentItem.isLiked = !commentItem.isLiked;
  await commentLike(commentItem.commentId);
  commentItem.likeNum += commentItem.isLiked ? 1 : -1;
};

const clickDisLike = async (commentItem) => {
  commentItem.isLiked = !commentItem.isLiked;
  await commentDisLike(commentItem.commentId);
  commentItem.likeNum -= commentItem.isLiked ? 1 : -1;
};

const LikePost = async () => {
  if (isLikePost.value) {
    await postDisLike(postId); // 取消点赞
  } else {
    await postLike(postId); // 点赞
  }
  isLikePost.value = !isLikePost.value;
};

const FavorPost = async () => {
  if (isCollectPost.value) {
    await postUnFavor(postId,userNum.value); // 取消收藏
  } else {
    await postFavor(postId,userNum.value); // 收藏
  }
  isCollectPost.value = !isCollectPost.value;
};

const submitComment = async () => {
  if (newComment.value.content.trim() !== "") {
    const encodedContent = encodeURIComponent(newComment.value.content); // 对评论内容进行 URL 编码
    if (store.getters.getIsTeacher) {
      await submitPostCommentByTeacher(postId, encodedContent, userNum.value);
    } else {
      await submitPostComment(postId, encodedContent, userNum.value);
    }
    await fetchPostDetails();
    showCommentForm.value = false;
    newComment.value = { content: "" };
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
    const encodedContent = encodeURIComponent(replyComment.value.content); // 对回复内容进行 URL 编码
    if (store.getters.getIsTeacher) {
      await submitPostCommentByTeacher(postId, encodedContent, userNum.value);
    } else {
      await submitPostComment(postId, encodedContent, userNum.value);
    }
    await fetchPostDetails();
    closeReplyForm();
  } else {
    alert("回复内容不能为空！");
  }
};


onMounted(() => {
  fetchPostDetails();
});
</script>

<style lang="scss" scoped>
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
  position: relative;
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
.discussion-comment-container {
  max-height: 60%;
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
.post-options-container-row {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  // padding: 30px 0;
  padding-right: 20px;
  position: absolute;
  right: 1rem;
  top: 2rem;
  background-color: #fff;
  width: 30%;
}
.post-options-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 15px;
}
.single-option-container {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  border: #fff 1px solid;
  border-radius: 6px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 1.6rem;
}
.single-option-container:hover {
  border: var(--main-color) 1px solid;
  color: var(--main-color);
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
