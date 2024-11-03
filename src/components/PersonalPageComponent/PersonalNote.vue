<template>
  <div class="note-container">
    <template v-for="(item, index) in notes">
      <div class="note-item-container">
        <div class="note-item">
          <div class="note-title">{{ item.noteTitle }}</div>
          <div class="note-content">{{ item.content }}</div>
        </div>
      </div>
      <div class="note-devide" v-if="index < notes.length - 1"></div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getMyNote } from "@/api/PersonalApi";
import { useStore } from 'vuex';

const store = useStore();
const userNum = computed(() => store.getters.getUserInfo.userNum);
const notes = ref([]);

const fetchMyNote = async () => {
  try {
    const response = await getMyNote(userNum.value);
    notes.value = response.notes;
    console.log(notes.value);
  } catch (error) {
    console.error("获取笔记失败", error);
  }
}
onMounted(() => {
  fetchMyNote();
})
</script>

<style scoped>
.note-container {
  margin: 20px 30px;
}
.note-item-container {
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.note-item {
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
}
.note-title {
  font-weight: bolder;
  font-size: 1.2rem;
  user-select: none;
  transition: 0.3s;
}
.note-title:hover {
  color: var(--main-color);
}
.note-content {
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
.note-devide {
  width: 100%;
  height: 2px;
  background-color: aliceblue;
}
</style>
