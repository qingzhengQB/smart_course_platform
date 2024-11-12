<template>
  <div class="discussion-detail-container">
    <div class="discussion-detail">
      <div class="discussion-title">{{ discussionDetail.title }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const discussionDetail = ref({
  title: "Discussion 1",
  content:
    "This is the content of discussion 1. Given the increasing reliance on digital technology in both personal and professional environments, especially with the rapid adoption of artificial intelligence (AI) and machine learning (ML) in various sectors, how can organizations ensure data privacy, cybersecurity, and ethical use of technology while still promoting innovation? Specifically, in cases where customer data is used to train AI algorithms, what are the best practices for maintaining transparency and accountability, and what steps should be taken to address biases that may inadvertently become part of the algorithm? Additionally, what role should government regulation play in overseeing the ethical development and application of AI, and how can companies balance compliance with these regulations while remaining competitive in a fast-evolving market?",
  auther: "Author",
  time: "2021-10-10 10:10:10",
  comment: [
    {
      auther: "Commenter 1",
      time: "2021-10-10 10:10:10",
      content: "This is the content of comment 1",
      replyTo: "",
    },
    {
      auther: "Commenter 2",
      content: "This is the content of comment 2",
      replyTo: "Commenter 1",
    },
    {
      auther: "Commenter 3",
      content: "This is the content of comment 3",
      replyTo: "Commenter 1",
    },
    {
      auther: "Commenter 4",
      content: "This is the content of comment 4",
      replyTo: "",
    },
    {
      auther: "Commenter 5",
      content: "This is the content of comment 5",
      replyTo: "Commenter 2",
    },
  ],
});
</script>

<style scoped></style>
