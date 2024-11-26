import { createStore } from "vuex";
import router from "@/router";

function storeUserInfo(userinfo) {
  window.localStorage.setItem("userinfo-name", userinfo.name);
  window.localStorage.setItem("userinfo-role", userinfo.role);
  window.localStorage.setItem("userinfo-userNum", userinfo.userNum);
}

export default createStore({
  state: {
    pagename: "智慧课程平台",
    userinfo: {
      name: "",
      role: "学生",
      userNum: "",
    },
  },
  getters: {
    // Getter to retrieve the user info
    getUserInfo(state) {
      if (state.userinfo.name == "") {
        if (window.localStorage.getItem("userinfo-name") != null) {
          state.userinfo.name = window.localStorage.getItem("userinfo-name");
          state.userinfo.role = window.localStorage.getItem("userinfo-role");
          state.userinfo.userNum =
            window.localStorage.getItem("userinfo-userNum");
        } else {
          router.push("/login");
        }
      }
      return state.userinfo;
    },
    // Getter to retrieve the page name
    getPagename(state) {
      return state.pagename;
    },
    getIsTeacher(state) {
      if (state.userinfo.name == "") {
        console.log("userinfo.name is empty");
        if (window.localStorage.getItem("userinfo-name") != null) {
          state.userinfo.name = window.localStorage.getItem("userinfo-name");
          state.userinfo.role = window.localStorage.getItem("userinfo-role");
          state.userinfo.userNum =
            window.localStorage.getItem("userinfo-userNum");
        } else {
          console.log("userinfo.name is empty and no local storage");
          router.push("/login");
        }
      }
      return state.userinfo.role == "老师";
    },
  },
  mutations: {
    setPagename(state, pagename) {
      state.pagename = pagename;
    },
    setUserInfo(state, userinfo) {
      // Merge user info into the existing state
      Object.assign(state.userinfo, userinfo);
      storeUserInfo(userinfo);
    },
    setUserNum(state, userNum) {
      state.userinfo.userNum = userNum; // Set userNum individually
    },
  },
  actions: {
    updateUserNum({ commit }, userNum) {
      commit("setUserNum", userNum); // Call mutation to set userNum
    },
    updateUserInfo({ commit }, userinfo) {
      commit("setUserInfo", userinfo); // Call mutation to set userinfo
    },
  },
  modules: {},
});
