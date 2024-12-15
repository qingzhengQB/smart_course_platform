//import "./mock/mock"; // 引入 Mock.js

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";

import Echarts from "vue-echarts";
import * as echarts from "echarts";

const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(store);
app.use(router);
app.component("v-chart", Echarts);
app.config.globalProperties.$echarts = echarts;
app.mount("#app");
