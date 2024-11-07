import { createRouter, createWebHistory } from "vue-router";
import layout from "@/views/layout/index.vue";
import CourseDetailLayout from "@/views/CourseDetailLayout/index.vue";

const routes = [
  {
    path: "/",
    component: layout,
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/HomeView.vue"),
      },
      {
        path: "course/:id",
        name: "course",
        component: CourseDetailLayout,
        // 不使用函数会重定到course/:id/info，:id不会转换
        redirect: (to) => {
          const { id } = to.params;
          return `/course/${id}/info`;
        },
        children: [
          {
            path: "info",
            name: "info",
            // component: () =>
            //   import("@/components/CourceDetailComponent/CourseInfo.vue"),
            children: [
              {
                path: "main",
                name: "main",
                component: () =>
                  import("@/components/CourceDetailComponent/CourseInfo.vue"),
              },
              {
                path: "homework",
                name: "homework",
                component: () =>
                  import(
                    "@/components/CourceDetailComponent/CourseHomework.vue"
                  )
              },
            ],
          },
        ],
      },
      {
        path: "personal",
        name: "personal",
        component: () => import("@/views/PersonalPage.vue"),
        children: [
          {
            path: "question",
            name: "question",
            component: () =>
              import("@/components/PersonalPageComponent/PersonalQuestion.vue"),
          },
          {
            path: "answer",
            name: "answer",
            component: () =>
              import("@/components/PersonalPageComponent/PersonalAnswer.vue"),
          },
          {
            path: "collection",
            name: "collection",
            component: () =>
              import(
                "@/components/PersonalPageComponent/PersonalCollection.vue"
              ),
          },
          {
            path: "note",
            name: "note",
            component: () =>
              import("@/components/PersonalPageComponent/PersonalNote.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/notification",
    name: "notification",
    component: () => import("@/views/notification.vue"),
  },
  {
    path: "/mul",
    name: "mul",
    component: () => import("@/views/mul.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
