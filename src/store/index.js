import { createStore } from "vuex";

export default createStore({
  state: {
    pagename: "智慧课程平台",
    userinfo: {
      name: "xxx",
      role: "学生",
      userNum:"",
    },
  },
  getters: {},
  mutations: {
    setPagename(state, pagename) {
      state.pagename = pagename;
    },
    setUserInfo(state, userinfo) {
      // 这里使用 Object.assign 合并用户信息
      Object.assign(state.userinfo, userinfo);
    },
    setUserNum(state, userNum) {
      state.userinfo.userNum = userNum; // 单独设置 userNum
    },
  },
  actions: {
    updateUserNum({ commit }, userNum) {
      commit("setUserNum", userNum); // 调用 mutation 设置 userNum
    },
  },
  modules: {},
});
