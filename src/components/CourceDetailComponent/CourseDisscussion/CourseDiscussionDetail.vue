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
        <div>点赞数： {{ postDetail[0]?.likeNum }} 收藏数：{{ postDetail[0]?.favoNum }}</div>
        <div class="discussion-comment-container">
          <div
            v-for="(commentItem, index) in postComment"
            class="single-comment"
          >
            <div class="comment-devide-line"></div>
            <div class="comment-content-container">
              <div class="main-comment-container">
                <div class="comment-row-container">
                  <div class="comment-author-container">
                    <div class="comment-author-avatar">
                      <img
                        class="user-avatar"
                        src="@/assets/avatar.png"
                        alt="avatar"
                      />
                    </div>
                    <div class="comment-author">
                      {{ commentItem.studentName !== null ? commentItem.studentName : commentItem.teacherName }} 回复 {{ commentItem.commentedName  }}
                    </div>
                  </div>
                  <div> 点赞数{{ commentItem.likeNum }}</div>
                  <div class="comment-options-container">
                    <i
                      v-if="commentItem.isLiked"
                      class="fa-solid fa-thumbs-up"
                      @click="commentItem.isLiked = !commentItem.isLiked"
                    ></i>
                    <i
                      v-else
                      class="fa-regular fa-thumbs-up"
                      @click="commentItem.isLiked = !commentItem.isLiked"
                    ></i>
                    <i class="fa-regular fa-comment"></i>
                  </div>
                </div>
                <div class="comment-content">
                  {{ commentItem.content }}
                </div>
              </div>
            </div>
            <!-- <div
            v-if="replyIndex != commentItem.reply.length - 1"
            class="comment-devide-line"
          ></div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getCoursePostDetial  } from "@/api/CoursePageApi";
const route = useRoute();
const postId = route.params.id;
const postDetail = ref({});

const postComment = ref([]);
const fetchPostDetails = async () => { 
  const response = await getCoursePostDetial(postId);
  postDetail.value = response.postDetial;
  postComment.value = response.postComments;
  
}
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
}
.discussion-detail {
  width: 95%;
  height: 95%;
  /* margin-top: 10px; */
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
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
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.discussion-title {
  font-size: 1.5rem;
  font-weight: bolder;
}
.discussion-info-container {
  display: flex;
  gap: 10px;
  margin: 10px 0;
  margin-right: auto;
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
  height: 2rem;
  aspect-ratio: 1 / 1;
  padding-right: 6px;
}
.reply-time,
.comment-time,
.discussion-time {
  font-size: 0.95rem;
  color: #8c8c8c;
  height: 1rem;
}
.discussion-content-container,
.comment-content,
.reply-content {
  font-size: 1rem;
  width: 97%;
  margin: 20px 0;
  font-size: 1.1rem;
  padding: 5px 10px;
  border: var(--main-border);
  border-width: 3px;
  border-radius: 10px;
}
.comment-devide-line {
  height: 1px;
  width: 100%;
  background-color: #cfcfcf;
}
.comment-row-container,
.reply-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.comment-options-container,
.reply-options-container {
  display: flex;
  gap: 25px;
  padding-right: 20px;
}
.discussion-comment-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: space-evenly;
}
.comment-author-container {
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 10px 0;
}
.reply-container {
  margin-left: 50px;
}
.reply-author-container {
  display: flex;
  gap: 15px;
  align-items: center;
}
.reply-info-container {
  display: flex;
  gap: 10px;
  flex-direction: column;
}
</style>
