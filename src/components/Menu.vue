<template>
  <div class="tac">
    <!-- <el-col :span="12"> -->
    <el-menu
      active-text-color="var(--menu-color-hover)"
      background-color="var(--main-page-bg)"
      class="el-menu-vertical"
      :default-active="activeIndex"
      @select="handleSelect"
      text-color="#fff"
      router
    >
      <template v-for="(item, index) in menuList">
        <el-sub-menu v-if="item.children" :index="basePath() + item.url">
          <template #title>
            <span>{{ item.name }}</span>
          </template>
          <div
            v-for="(subitem, subindex) in item.children"
            class="menu-item-bg"
          >
            <el-menu-item :index="`${basePath()}${item.url}${subitem.url}`">{{
              subitem.name
            }}</el-menu-item>
          </div>
        </el-sub-menu>
        <div class="menu-item-bg" v-else>
          <el-menu-item :index="basePath() + item.url">
            <span>{{ item.name }}</span>
          </el-menu-item>
        </div>
      </template>
    </el-menu>
    <!-- </el-col> -->
    <div class="filler"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const basePath = () => {
  const segments = route.path.split("/").filter(Boolean); // 分割路径并过滤掉空项
  return segments.length >= 2
    ? `/${segments[0]}/${segments[1]}`
    : `/${segments[0] || ""}`;
};
const menuList = location.pathname.startsWith("/course/")
  ? [
      {
        name: "课程信息",
        url: "/course-info",
        children: [
          { name: "课程介绍", url: "/coursedescription" },
          { name: "教学大纲", url: "/syllabus" },
          { name: "教师信息", url: "/teacherinformation" },
          { name: "教学日历", url: "/teachingcalendar" },
        ],
      },
      { name: "课程通知", url: "/notifications" },
      {
        name: "课程资源",
        url: "/resource",
        children: [
          { name: "电子课件", url: "/courseware" },
          { name: "习题库", url: "/exercisebank" },
          // { name: "历年试卷库", url: "/paper" },
        ],
      },
      {
        name: "课程作业",
        url: "/homework",
      },
      { name: "答疑讨论", url: "/discussion" },
    ]
  : // 待修改
    [
      {
        name: "课程信息",
        url: "/course-info",
        children: [
          { name: "课程介绍", url: "/coursedescription" },
          { name: "教学大纲", url: "/syllabus" },
          { name: "教师信息", url: "/teacherinformation" },
          { name: "教学日历", url: "/teachingcalendar" },
        ],
      },
      { name: "发布课程通知", url: "/notifications" },
      {
        name: "上传课程资源",
        url: "/resource",
        children: [
          { name: "上传电子课件", url: "/courseware" },
          { name: "上传习题库", url: "/exercisebank" },
          // { name: "上传历年试卷库", url: "/paper" },
        ],
      },
      {
        name: "课程作业",
        url: "/homework",
        children: [
          { name: "发布作业", url: "/publish" },
          { name: "批改作业", url: "/correcting" },
          { name: "作业成绩统计", url: "/statistics" },
        ],
      },
      { name: "答疑讨论", url: "/discussion" },
    ];
console.log(menuList);
const activeIndex = ref(
  basePath() + menuList[0].url + menuList[0].children[0].url
);
const previousItem = ref(null);
const nextItem = ref(null);

// 当 activeIndex 改变时，动态更新前后菜单项的样式
watch(activeIndex, (newIndex) => {
  setTimeout(() => {
    updateAdjacentMenuItems(newIndex);
  }, 100);
});
function adjustIMenutem(pre, next) {
  console.log(pre, next);
  if (pre) {
    pre.classList.add("adjacent-active-previous");
    pre.parentElement.classList.add("adjacent-active-previous");
    previousItem.value = pre;
  } else {
    console.log("pre undefined");
  }
  if (next) {
    next.classList.add("adjacent-active-next");
    next.parentElement.classList.add("adjacent-active-next");
    nextItem.value = next;
  } else {
    console.log("next undefined");
  }
}
function updateAdjacentMenuItems() {
  // 清除之前的前后项样式
  if (previousItem.value) {
    console.log(previousItem.value);
    previousItem.value.classList.remove("adjacent-active-previous");
    previousItem.value.parentElement.classList.remove(
      "adjacent-active-previous"
    );
  }
  if (nextItem.value) {
    nextItem.value.classList.remove("adjacent-active-next");
    nextItem.value.parentElement.classList.remove("adjacent-active-next");
  }

  // 查找当前项、前一项和后一项的元素
  const menuItems = document.querySelectorAll(".el-menu-item");
  const currentIndex = [...menuItems].findIndex((item) =>
    item.classList.contains("is-active")
  );
  console.log(currentIndex, menuItems[currentIndex]);
  if (menuItems[currentIndex] && menuItems[currentIndex].parentElement) {
    if (menuItems[currentIndex].parentElement.length == 1) {
      console.log("only one");
      // const subDiv =
      //   menuItems[currentIndex].parentElement.parentElement.querySelector("div");
      // const nextDiv =
      //   menuItems[
      //     currentIndex
      //   ].parentElement.parentElement.nextElementSibling.querySelector("div");
      adjustIMenutem(null, null);
    } else {
      if (
        menuItems[currentIndex].parentElement.parentElement.children[0] ==
        menuItems[currentIndex].parentElement
      ) {
        console.log("first");
        // const subDiv =
        //   menuItems[currentIndex].parentElement.parentElement.querySelector(
        //     "div"
        //   );
        adjustIMenutem(null, menuItems[currentIndex + 1]);
      } else if (
        menuItems[currentIndex].parentElement.parentElement.children[
          menuItems[currentIndex].parentElement.parentElement.children.length -
            1
        ] == menuItems[currentIndex].parentElement ||
        menuItems[currentIndex].parentElement.nextElementSibling.tagName == "LI"
      ) {
        console.log("last");
        // const nextDiv =
        //   menuItems[
        //     currentIndex
        //   ].parentElement.parentElement.parentElement.nextElementSibling.querySelector(
        //     "div"
        //   );
        adjustIMenutem(menuItems[currentIndex - 1], null);
      } else {
        console.log("between");
        adjustIMenutem(
          menuItems[currentIndex - 1],
          menuItems[currentIndex + 1]
        );
      }
    }
  } else {
    console.log("no parent");
  }
}
function handleSelect(index) {
  activeIndex.value = index;
}
onMounted(() => {
  updateAdjacentMenuItems();
});
</script>

<style lang="scss" scoped>
$menuSelectBorderRadius: 15px;
.tac {
  background-color: var(--main-color);
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
}
.el-menu,
.el-menu-item {
  background-color: var(--menu-color);
  overflow: hidden;
}
.el-menu {
  border: none;
}
.el-menu-item:hover {
  background-color: var(--menu-color-hover);
  color: white;
}
.el-menu-item.is-active,
.el-menu-item.is-active:hover {
  background-color: var(--main-page-bg) !important;
  color: var(--menu-color-hover) !important;
  border-top-left-radius: $menuSelectBorderRadius;
  border-bottom-left-radius: $menuSelectBorderRadius;
}
.el-menu-vertical {
  width: 220px;
  font-weight: bolder;
  // flex-grow: 1; /* 让 el-menu 自适应父容器 */
  overflow-y: auto; /* 允许 el-menu 自身滚动 */
  max-height: 100%; /* 限制高度，不会超出 .tac */
  scrollbar-width: none; /* 隐藏滚动条 */
  background-color: var(--main-page-bg);
}
.menu-item-bg {
  background-color: var(--menu-color);
  overflow: hidden;
}
.filler {
  flex-grow: 1;
  background-color: var(--menu-color); /* 可选背景颜色，方便视觉区分 */
}
</style>

<style>
.adjacent-active-previous {
  border-bottom-right-radius: 15px !important;
  overflow: hidden !important;
}

.adjacent-active-next {
  border-top-right-radius: 15px;
  overflow: hidden;
}
.el-scrollbar__view {
  display: flex;
  flex-direction: column;
}
.el-sub-menu__title {
  background-color: var(--menu-color);
}
.el-sub-menu__title:hover {
  background-color: var(--menu-color-hover) !important;
}
</style>
