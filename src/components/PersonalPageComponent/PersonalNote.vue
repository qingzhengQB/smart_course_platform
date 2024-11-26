<template>
  <div class="note-container">
    <template v-for="(item, index) in notes">
      <div class="note-item-container">
        <div class="note-item">
          <div class="note-title" @click="toPreviewNote(item.noteId)">
            {{ item.noteTitle }}
          </div>
          <div class="note-content" @click="toPreviewNote(item.noteId)">
            {{ item.content }}
          </div>
          <div class="note-collect-icon" v-if="isOther">
            <i
              v-if="!item.isCollectted"
              class="fa-regular fa-bookmark fa-icon-style"
            ></i>
            <i v-else class="fa-solid fa-bookmark fa-icon-style"></i>
          </div>
          <div v-else class="note-collect-icon note-collect-delete-icon">
            <i
              class="fa-solid fa-trash-alt fa-icon-style fa-delete-icon-style"
              @click="deleteNote(item.noteId)"
            ></i>
          </div>
        </div>
      </div>
      <div class="note-devide" v-if="index < notes.length - 1"></div>
    </template>
    <div class="note-create-container" v-if="!isOther">
      <el-button
        type="primary"
        class="note-create-button"
        @click="mdEditorVisible = true"
        >新建笔记</el-button
      >
    </div>
  </div>
  <el-dialog
    title="新建Markdown笔记"
    v-model="mdEditorVisible"
    width="90%"
    top="8vh"
    :before-close="beforeClose"
  >
    <el-input
      v-model="mdEditTitle"
      placeholder="请输入标题"
      class="note-title-input"
    ></el-input>
    <MdEditor
      v-model="mdEditContent"
      :toolbars-exclude="['github', 'save', 'image']"
    />
    <div class="note-create-save-container">
      <el-button type="primary" @click="saveNote">保存</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getMyNote, saveNewNote, deleteNoteByNoteId } from "@/api/PersonalApi";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { ElMessage } from "element-plus";
const router = useRouter();
const store = useStore();
const userNum = computed(() => store.getters.getUserInfo.userNum);
const notes = ref([]);
const isOther = ref(window.location.pathname.startsWith("/other-personal")); // 是否是别人的主页
const mdEditorVisible = ref(false);
const mdEditTitle = ref(""),
  mdEditContent = ref(``);
const beforeClose = () => {
  // 空实现，防止报错
};
const fetchMyNote = async () => {
  try {
    const response = await getMyNote(userNum.value);
    notes.value = response.notes;
    console.log(notes.value);
  } catch (error) {
    console.error("获取笔记失败", error);
  }
};
const saveNote = async () => {
  try {
    await saveNewNote(userNum.value, mdEditTitle.value, mdEditContent.value);
    ElMessage.success("笔记保存成功");
    mdEditorVisible.value = false; // 使用 .value 关闭对话框
    mdEditTitle.value = ""; // 清空标题
    mdEditContent.value = ""; // 清空内容
    fetchMyNote(); // 刷新笔记列表
  } catch (error) {
    ElMessage.warning("笔记保存失败");
  }
};

function toPreviewNote(noteId) {
  router.push({ name: "note-preview", params: { id: noteId } });
}
// 删除操作
const deleteNote = async (noteId) => {
  try {
    const response = await deleteNoteByNoteId(noteId);
    console.log(response);
    fetchMyNote();
  } catch (error) {
    console.error("删除失败");
  }
};
onMounted(() => {
  fetchMyNote();
});
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
  position: relative;
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
.note-collect-icon {
  position: absolute;
  right: 10px;
  top: 10px;
  /* color: var(--main-color); */
  font-size: 1.2rem;
}
.note-create-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.note-title-input {
  margin: 15px 0;
}
.note-create-save-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 20px 0;
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
