<template>
  <div class="note-container">
    <template v-for="(item, index) in notes">
      <div class="note-item-container">
        <div class="note-item" @click="toPreviewNote(item.noteId)">
          <div class="note-title">{{ item.noteTitle }}</div>
          <div class="note-content">{{ item.content }}</div>
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
import { getMyNote } from "@/api/PersonalApi";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
const router = useRouter();
const store = useStore();
const userNum = computed(() => store.getters.getUserInfo.userNum);
const notes = ref([]);
const isOther = ref(window.location.pathname.startsWith("/other-personal")); // 是否是别人的主页
const mdEditorVisible = ref(false);
const mdEditTitle = ref(""),
  mdEditContent = ref(`
### 基本使用

**加粗**，<u>下划线</u>，_斜体_，~~删除线~~，上标^26^，下标~1~，\`inline code\`，[超链接](https://github.com/imzbf)

> 引用：《I Have a Dream》

1. So even though we face the difficulties of today and tomorrow, I still have a dream.
2. It is a dream deeply rooted in the American dream.
3. I have a dream that one day this nation will rise up.

- [ ] 周五
- [ ] 周六
- [x] 周天

![图片](https://imzbf.github.io/md-editor-rt/imgs/mark_emoji.gif)

## 代码演示

\`\`\`vue
<template>
  <MdEditor v-model="text" />
</template>

<style lang='scss' scoped>
// style content
</style>
\`\`\`

## 🖨 文本演示

依照普朗克长度这项单位，目前可观测的宇宙的直径估计值（直径约 930 亿光年，即 8.8 × 10<sup>26</sup> 米）即为 5.4 × 10<sup>61</sup>倍普朗克长度。而可观测宇宙体积则为 8.4 × 10<sup>184</sup>立方普朗克长度（普朗克体积）。

## 表格演示

| 表头1  |  表头2   |  表头3 |
| :----- | :------: | -----: |
| 左对齐 | 中间对齐 | 右对齐 |

## 📏 公式

行内：$x+y^{2x}$

$$
\sqrt[3]{x}
$$

## 图表

\`\`\`mermaid
flowchart TD
  Start --> Stop
\`\`\`

## 提示

!!! note 支持的类型 note

note、abstract、info、tip、success、question、warning、failure、danger、bug、example、quote、hint、caution、error、attention

!!!

!!! abstract 提示
abstract 提示内容
!!!
!!! info 提示
info 提示内容
!!!

## 占个坑@！
  `);
const fetchMyNote = async () => {
  try {
    const response = await getMyNote(userNum.value);
    notes.value = response.notes;
    console.log(notes.value);
  } catch (error) {
    console.error("获取笔记失败", error);
  }
};
function saveNote() {}
function toPreviewNote(noteId) {
  router.push({ name: "note-preview", params: { noteId } });
}
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
