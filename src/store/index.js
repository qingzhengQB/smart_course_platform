import { createStore } from "vuex";

export default createStore({
  state: {
    pagename: "智慧课程平台",
    userinfo: {
      name: "xxx",
      role: "学生",
    },
  },
  getters: {},
  mutations: {
    setPagename(state, pagename) {
      state.pagename = pagename;
    },
    setUserInfo(state, userinfo) {
      state.userinfo = userinfo;
    },
  },
  actions: {},
  modules: {},
});
