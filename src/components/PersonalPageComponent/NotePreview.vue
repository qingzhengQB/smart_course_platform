<template>
  <div class="note-preview-container">
    <div class="note-content-container">
      <div class="note-main-container common-border">
        <MdPreview
          :id="noteId"
          class="note-content"
          :editorId="noteId"
          :modelValue="mdContent"
        />
      </div>
      <div class="note-side-container">
        <BusinessCard />
        <div class="sticky-aria">
          <div class="note-catalog-container common-border">
            <MdCatalog
              :id="noteId"
              class="note-catalog"
              :editorId="noteId"
              :scrollElement="scrollElement"
              offsetTop="300"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { MdPreview, MdCatalog, config } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
const scrollElement = document.documentElement;
const noteId = "post-content";
const mdContent = ref(`
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
  
  ## 文本演示
  
  依照普朗克长度这项单位，目前可观测的宇宙的直径估计值（直径约 930 亿光年，即 8.8 × 10<sup>26</sup> 米）即为 5.4 × 10<sup>61</sup>倍普朗克长度。而可观测宇宙体积则为 8.4 × 10<sup>184</sup>立方普朗克长度（普朗克体积）。
  
  ## 表格演示
  
  | 表头1  |  表头2   |  表头3 |
  | :----- | :------: | -----: |
  | 左对齐 | 中间对齐 | 右对齐 |
  
  ## 公式
  
  行内：$x+y^{2x}$
  
  $$
  \sqrt[3]{x}
  $$
  
  ## 图表
  流程图
  \`\`\`mermaid
  flowchart TD
    Start --> Stop
  \`\`\`
  甘特图
  \`\`\`mermaid
  gantt
      title 项目计划
      dateFormat  YYYY-MM-DD
      section 需求分析
      编写需求文档     :a1, 2024-11-01, 10d
      需求评审         :after a1, 5d
      section 开发阶段
      数据库设计       :b1, 2024-11-15, 7d
      后端开发         :b2, after b1, 10d
      前端开发         :b3, after b1, 8d
      整合与测试       :after b2, 5d
      section 发布
      上线准备         :c1, 2024-12-05, 2d
      正式上线         :after c1, 1d
  \`\`\`
  等等
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
  
  # 一级标题演示
  ## 二级标题 占个坑@！
  ### 三级标题
    `);
</script>

<style lang="scss" scoped>
$mainBorderRadius: 10px;
$mainBorder: var(--main-border);
$allContentWidth: 90vw;
.common-border {
  border-radius: $mainBorderRadius;
  border: $mainBorder;
}
.note-preview-container {
  width: 100%;
}
.note-content-container {
  margin: auto;
  width: $allContentWidth;
  margin-top: 1vh;
  display: flex;
  justify-content: space-between;

  transition: all 0.3s ease;
  gap: 0.7%;
}

.note-side-container {
  width: 21%;
  user-select: none;
  display: flex;
  flex-direction: column;
  gap: 0.8vh;
}

.sticky-aria {
  position: sticky;
  display: flex;
  flex-direction: column;
  top: 0.8vh; //视口顶部距离
  gap: 0.8vh;
}

.note-catalog-container {
  /* 当元素接触视口顶部时固定 */
  // position: sticky;
  // top: 0.8vh; //视口顶部距离
  padding: 6px 15px;
  background-color: #fff;
}

.note-main-container {
  width: 78%;
  display: flex;
  flex-direction: column;
  padding: 32px 40px;
  background-color: #fff;
}

// .divide-line-container {
//   margin: 5px 20px;
// }
.divide-line {
  background: repeating-linear-gradient(
    to right,
    rgba(161, 172, 247, 0.3),
    rgba(161, 172, 247, 0.3) 1.5%,
    transparent 1.5%,
    transparent 3%
  );
  /* 创建一条虚线背景 */
  height: 3px;
  /* 设置元素的高度为1像素 */
  width: 100%;
  /* 设置元素的宽度为100% */
  opacity: 0.8;
  overflow: hidden;
}

.note-catalog {
  width: 100%;
  font-weight: 700;
  font-size: 18px;
}

.note-content {
  width: 100%;
  border-top-left-radius: $mainBorderRadius;
  border-top-right-radius: $mainBorderRadius;
  padding-bottom: 4vh;
}
</style>
