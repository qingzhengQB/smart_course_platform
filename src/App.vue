<template>
  <router-view />
</template>

<style lang="scss">
:root {
  --main-page-bg: #f7f9fe;
  --main-color: var(--el-color-primary-dark-2);
  --main-border-color: #e3e8f7;
  --main-border-width: 1px;
  --main-border-radius: 10px;
  --main-border: var(--main-border-width) solid var(--main-border-color);
  --main-box-shadow: 0px 0px 5px rgb(176, 176, 176);
  --page-head-height: 7vh;
  --menu-color: #66b1ff;
  --menu-color-hover: #409eff;
  --font-color: #2c3e50;
}

body {
  margin: 0;
  background-color: var(--main-page-bg);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
