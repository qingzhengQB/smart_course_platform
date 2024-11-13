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
          return `/course/${id}/course-info/coursedescription`;
        },
        children: [
          {
            path: "course-info",
            name: "course-info",
            children: [
              {
                path: "coursedescription",
                name: "coursedescription",
                component: () =>
                  import(
                    "@/components/CourceDetailComponent/CourseInfo/CourseDescription.vue"
                  ),
              },
              {
                path: "teacherinformation",
                name: "teacherinformation",
                component: () =>
                  import(
                    "@/components/CourceDetailComponent/CourseInfo/TeacherInformation.vue"
                  ),
              },
              {
                path: "syllabus",
                name: "syllabus",
                component: () =>
                  import(
                    "@/components/CourceDetailComponent/CourseInfo/Syllabus.vue"
                  ),
              },
              {
                path: "teachingcalendar",
                name: "teachingcalendar",
                component: () =>
                  import(
                    "@/components/CourceDetailComponent/CourseInfo/TeachingCalendar.vue"
                  ),
              },
            ],
          },
          {
            path: "resource",
            name: "resource",
            children: [
              {
                path: "courseware",
                name: "courseware",
                component: () =>
                  import(
                    "@/components/CourceDetailComponent/CourseResource/CourseWare.vue"
                  ),
              },
              {
                path: "preview/:id",
                name: "preview",
                component: () =>
                  import(
                    "@/components/CourceDetailComponent/CourseResource/PreviewPage.vue"
                  ),
                props: true,
              },
              {
                path: "exercisebank",
                name: "exercisebank",
                component: () =>
                  import(
                    "@/components/CourceDetailComponent/CourseResource/ExerciseBank.vue"
                  ),
              },
              {
                path: "paper",
                name: "paper",
                component: () =>
                  import(
                    "@/components/CourceDetailComponent/CourseResource/Paper.vue"
                  ),
              },
            ],
          },
          {
            path: "homework",
            name: "homework",
            component: () =>
              import(
                "@/components/CourceDetailComponent/CourseHomework/Homework.vue"
              ),
          },
          {
            name: "notifications",
            path: "notifications",
            component: () =>
              import(
                "@/components/CourceDetailComponent/CourseNotification/Notification.vue"
              ),
          },
          {
            name: "discussion",
            path: "discussion",
            component: () =>
              import(
                "@/components/CourceDetailComponent/CourseDisscussion/CourseDiscussion.vue"
              ),
          },
          {
            name: "discussion-detail",
            path: "discussion/:id",
            component: () =>
              import(
                "@/components/CourceDetailComponent/CourseDisscussion/CourseDiscussionDetail.vue"
              ),
          },
        ],
      },

      {
        path: "teacher-course/:id",
        name: "teacher-course",
        component: CourseDetailLayout,
        redirect: (to) => {
          const { id } = to.params;
          return `/teacher-course/${id}/course-info/coursedescription`;
        },
        children: [
          {
            name: "teacher-course-info",
            path: "course-info",
            children: [
              {
                path: "coursedescription",
                name: "teacher-coursedescription",
                component: () =>
                  import(
                    "@/components/CourceDetailComponent/CourseInfo/CourseDescription.vue"
                  ),
              },
              {
                path: "teacherinformation",
                name: "teacher-teacherinformation",
                component: () =>
                  import(
                    "@/components/CourceDetailComponent/CourseInfo/TeacherInformation.vue"
                  ),
              },
              {
                path: "syllabus",
                name: "teacher-syllabus",
                component: () =>
                  import(
                    "@/components/CourceDetailComponent/CourseInfo/Syllabus.vue"
                  ),
              },
              {
                path: "teachingcalendar",
                name: "teacher-teachingcalendar",
                component: () =>
                  import(
                    "@/components/CourceDetailComponent/CourseInfo/TeachingCalendar.vue"
                  ),
              },
            ],
          },
          {
            path: "resource",
            name: "teaacher-resource",
            children: [
              {
                path: "courseware",
                name: "teacher-courseware",
                component: () =>
                  import(
                    "@/components/CourceDetailComponent/CourseResource/CourseWare.vue"
                  ),
              },
              {
                path: "preview/:id",
                name: "teacher-preview",
                component: () =>
                  import(
                    "@/components/CourceDetailComponent/CourseResource/PreviewPage.vue"
                  ),
                props: true,
              },
              {
                path: "exercisebank",
                name: "teacher-exercisebank",
                component: () =>
                  import(
                    "@/components/CourceDetailComponent/CourseResource/ExerciseBank.vue"
                  ),
              },
              {
                path: "paper",
                name: "teacher-paper",
                component: () =>
                  import(
                    "@/components/CourceDetailComponent/CourseResource/Paper.vue"
                  ),
              },
            ],
          },
          {
            path: "homework",
            name: "teacher-homework",
            children: [
              {
                name: "publish-homework",
                path: "publish",
                component: () =>
                  import(
                    "@/components/TeacherCourseDetailComponent/Homework/PublishHomework.vue"
                  ),
              },
              {
                name: "correctting-homework",
                path: "correcting",
                component: () =>
                  import(
                    "@/components/TeacherCourseDetailComponent/Homework/CorrectingHomework.vue"
                  ),
              },
              {
                name: "statistics-homework",
                path: "statistics",
                component: () =>
                  import(
                    "@/components/TeacherCourseDetailComponent/Homework/StatisticsHomework.vue"
                  ),
              },
            ],
          },

          {
            name: "teacher-notifications",
            path: "notifications",
            component: () =>
              import(
                "@/components/TeacherCourseDetailComponent/SendNotification.vue"
              ),
          },
          {
            name: "teacher-discussion",
            path: "discussion",
            component: () =>
              import(
                "@/components/CourceDetailComponent/CourseDisscussion/CourseDiscussion.vue"
              ),
          },
          {
            name: "teacher-discussion-detail",
            path: "discussion/:id",
            component: () =>
              import(
                "@/components/CourceDetailComponent/CourseDisscussion/CourseDiscussionDetail.vue"
              ),
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
