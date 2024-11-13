<template>
  <div class="discussion-detail-container">
    <div class="discussion-detail">
      <div class="discussion-detail-inner-container">
        <div class="discussion-title">{{ discussionDetail.title }}</div>
        <div class="discussion-info-container">
          <div class="discussion-author-container">
            <div class="discussion-author-avatar">
              <img class="user-avatar" src="@/assets/avatar.png" alt="avatar" />
            </div>
            <div class="discussion-author">{{ discussionDetail.auther }}</div>
          </div>
          <div class="discussion-time">{{ discussionDetail.time }}</div>
        </div>
        <div class="discussion-content-container">
          {{ discussionDetail.content }}
        </div>
        <div class="discussion-comment-container">
          <div
            v-for="(commentItem, index) in discussionDetail.comment"
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
                      {{ commentItem.name }}
                    </div>
                  </div>
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
              <div class="reply-container">
                <div
                  v-for="(replyItem, replyIndex) in commentItem.reply"
                  class="single-reply"
                >
                  <div class="reply-content-container">
                    <div class="reply-info-container">
                      <div class="reply-row">
                        <div class="reply-author-container">
                          <img
                            class="user-avatar"
                            src="@/assets/avatar.png"
                            alt="avatar"
                          />
                          <div class="reply-author">
                            {{ replyItem.auther }}
                          </div>
                          <i
                            v-if="replyItem.replyTo"
                            class="fa-solid fa-caret-right"
                          ></i>
                          <div class="reply-to" v-if="replyItem.replyTo">
                            {{ replyItem.replyTo }}:
                          </div>
                        </div>
                        <div class="reply-time">
                          {{ replyItem.time }}
                        </div>
                        <div class="reply-options-container">
                          <i
                            v-if="replyItem.isLiked"
                            class="fa-solid fa-thumbs-up"
                            @click="replyItem.isLiked = !replyItem.isLiked"
                          ></i>
                          <i
                            v-else
                            class="fa-regular fa-thumbs-up"
                            @click="replyItem.isLiked = !replyItem.isLiked"
                          ></i>
                          <i class="fa-regular fa-comment"></i>
                        </div>
                      </div>
                      <div class="reply-content">
                        {{ replyItem.content }}
                      </div>
                    </div>
                  </div>
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
import { ref } from "vue";

const discussionDetail = {
  title: "Discussion 1",
  content:
    "This is the content of discussion 1. Given the increasing reliance on digital technology in both personal and professional environments, especially with the rapid adoption of artificial intelligence (AI) and machine learning (ML) in various sectors, how can organizations ensure data privacy, cybersecurity, and ethical use of technology while still promoting innovation? Specifically, in cases where customer data is used to train AI algorithms, what are the best practices for maintaining transparency and accountability, and what steps should be taken to address biases that may inadvertently become part of the algorithm? Additionally, what role should government regulation play in overseeing the ethical development and application of AI, and how can companies balance compliance with these regulations while remaining competitive in a fast-evolving market?",
  auther: "Author",
  time: "2021-10-10 10:10:10",
  isLiked: false,
  comment: [
    {
      auther: "Commenter 1",
      time: "2021-10-10 10:10:10",
      content: "This is the content of comment 1",
      isLiked: false,
      reply: [
        {
          auther: "Commenter 2",
          time: "2021-10-10 10:10:10",
          content: "This is the content of reply 1",
          isLiked: false,
          replyTo: "",
        },
        {
          auther: "Commenter 3",
          time: "2021-10-10 10:10:10",
          content: "This is the content of reply 2",
          isLiked: false,
          replyTo: "Commenter 2",
        },
      ],
    },
    {
      auther: "Commenter 2",
      time: "2021-10-10 10:10:10",
      content: "This is the content of comment 2",
      isLiked: false,
      reply: [],
    },
    {
      auther: "Commenter 3",
      time: "2021-10-10 10:10:10",
      content: "This is the content of comment 3",
      isLiked: false,
      reply: [
        {
          auther: "Commenter 4",
          time: "2021-10-10 10:10:10",
          content: "This is the content of reply 1",
          isLiked: false,
          replyTo: "",
        },
        {
          auther: "Commenter 5",
          time: "2021-10-10 10:10:10",
          content: "This is the content of reply 2",
          isLiked: false,
          replyTo: "",
        },
        {
          auther: "Commenter 6",
          time: "2021-10-10 10:10:10",
          content: "This is the content of reply 3",
          isLiked: false,
          replyTo: "Commenter 5",
        },
        {
          auther: "Commenter 7",
          time: "2021-10-10 10:10:10",
          content: "This is the content of reply 4",
          isLiked: false,
          replyTo: "Commenter 5",
        },
        {
          auther: "Commenter 8",
          time: "2021-10-10 10:10:10",
          content: "This is the content of reply 5",
          isLiked: false,
          replyTo: "",
        },
      ],
    },
    {
      auther: "Commenter 4",
      time: "2021-10-10 10:10:10",
      content: "This is the content of comment 4",
      isLiked: false,
      reply: [],
    },
    {
      auther: "Commenter 5",
      time: "2021-10-10 10:10:10",
      content: "This is the content of comment 5",
      isLiked: false,
      reply: [
        {
          auther: "Commenter 6",
          time: "2021-10-10 10:10:10",
          content: "This is the content of reply 1",
          isLiked: false,
          replyTo: "",
        },
        {
          auther: "Commenter 7",
          time: "2021-10-10 10:10:10",
          content: "This is the content of reply 2",
          isLiked: false,
          replyTo: "",
        },
        {
          auther: "Commenter 8",
          time: "2021-10-10 10:10:10",
          content: "This is the content of reply 3",
          isLiked: false,
          replyTo: "Commenter 7",
        },
        {
          auther: "Commenter 9",
          time: "2021-10-10 10:10:10",
          content: "This is the content of reply 4",
          isLiked: false,
          replyTo: "Commenter 7",
        },
        {
          auther: "Commenter 10",
          time: "2021-10-10 10:10:10",
          content: "This is the content of reply 5",
          isLiked: false,
          replyTo: "",
        },
      ],
    },
  ],
};
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
