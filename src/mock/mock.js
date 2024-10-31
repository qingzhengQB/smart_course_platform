import Mock from 'mockjs';

Mock.mock('http://localhost:8000/student/getNotification', 'get', (options) => {
    return {
        notifications: [
            {
                notificationId: 1,
                teacherId: 1,
                content: "作业1已布置",
                createTime: "2024-10-31T22:15:58"
            },
            {
                notificationId: 2,
                teacherId: 1,
                content: "周五补课",
                createTime: "2024-10-31T22:55:05"
            }
        ],
        notificationNum: 2
    }
});

Mock.mock('http://localhost:8000/login', 'post', (options) => {

    return {
        redirect: "/student/dashboard",
        userNum: "852464",
        success: true,
        userName: "金安琪"
    };
});
// 设置 Mock 的拦截请求
Mock.mock(/\/student\/courses/, 'get', (options) => {
    const courses = [
        {
            courseId: 1,
            name: "数据结构",
            intro: "2024学期课程",
            outline: "无",
            teacherInfo: "无",
            calendar: "无",
            resource: null,
            teacher: {
                id: 1,
                name: "孙詩涵",
                password: "346018",
                teacherNum: "2592"
            }
        },
        {
            courseId: 2,
            name: "计算机导论",
            intro: "2024学期课程",
            outline: "无",
            teacherInfo: "无",
            calendar: "无",
            resource: null,
            teacher: {
                id: 2,
                name: "廖岚",
                password: "252797",
                teacherNum: "6429"
            }
        }
    ];

    return {
        courses, // 返回课程列表数据
    };
});


export default Mock;
