import Mock from 'mockjs';

Mock.setup({ timeout: '200-600' }); // 设置延迟
Mock.mock(/\/ai\/courseAi/, 'get', (options) => {
    const userInput = JSON.parse(options.body).question;
    return {
      code: 200,
      message: 'Success',
      answer: `Mocked AI response to: "${userInput}" - This is a simulated response from Mock.js.`,
    };
  });
// 修正正则表达式并模拟获取通知的接口
Mock.mock(/\/student\/getNotification/, 'get', (options) => {
    console.log('请求通知接口'); // 调试信息
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
    };
});

// 模拟登录接口
Mock.mock('http://localhost:8000/login', 'post', (options) => {
    console.log('请求登录接口'); // 调试信息
    return {
        redirect: "/student/dashboard",
        userNum: "852464",
        success: true,
        userName: "金安琪",
    };
});

// 模拟获取课程列表的接口
Mock.mock(/\/student\/courses/, 'get', (options) => {
    console.log('请求课程接口'); // 调试信息
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
        },
        {
            courseId: 3,
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
        },
        {
            courseId: 4,
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
// 模拟获取我的收藏的接口
Mock.mock(/\/favourite\/getFavourite/, 'get', (options) => {
    const params = new URLSearchParams(options.body);
    const userNum = params.get('studentNum'); // 获取请求参数 studentNum
    // 这里可以根据 userNum 做不同的返回
    // 目前我们返回固定的数据
    return {
        postList: [
            {
                postTitle: "算法疑问",
                courseName: "数据结构",
                likeNum: 90,
                favoNum: 5,
                content: "迪杰斯特拉算法的具体过程",
                favoriteName: "金的收藏夹"
            },
            {
                postTitle: "求电子版教材资源",
                courseName: "数据结构",
                likeNum: 1,
                favoNum: 0,
                content: "求电子版教材资源，各个版本都可以",
                favoriteName: "金的收藏夹"
            }
        ],
        othersFavos: [
            {
                otherFavoNum: "234567",
                otherFavoName: "韩的收藏夹",
                otherFavoCreaterName: "韩嘉伦"
            }
        ]
    };
});

// 模拟获取评论的接口
Mock.mock(/\/comment\/getComments/, 'get', (options) => {
    const params = new URLSearchParams(options.body);
    const userNum = params.get('userNum'); // 获取请求参数 userNum

    // 这里可以根据 userNum 做不同的返回
    // 目前我们返回固定的数据
    return {
        commentList: [
            {
                commentId: 1,
                postId: 3,
                likeNum: 1,
                content: "同求",
                commentedNum: "342680",
                commentedName: "韩嘉伦",
                teacherId: null,
                studentId: 1,
                postTitle: "求电子版教材资源"
            },
            {
                commentId: 2,
                postId: 3,
                likeNum: 0,
                content: "蹲有回复踢我",
                commentedNum: "342680",
                commentedName: "韩嘉伦",
                teacherId: null,
                studentId: 1,
                postTitle: "求电子版教材资源"
            }
        ]
    };
});

// 模拟获取帖子列表的接口
Mock.mock(/\/post\/getPosts/, 'get', (options) => {
    const params = new URLSearchParams(options.body);
    const studentNum = params.get('studentNum'); // 获取请求参数 studentNum

    // 这里可以根据 studentNum 做不同的返回
    // 目前我们返回固定的数据
    return {
        postNum: 2,
        posts: [
            {
                postId: 1,
                courseId: 1,
                studentId: 1,
                teacherId: 1,
                likeNum: 90,
                favoNum: 5,
                content: "迪杰斯特拉算法的具体过程",
                title: "算法疑问"
            },
            {
                postId: 2,
                courseId: 2,
                studentId: 1,
                teacherId: 2,
                likeNum: 1,
                favoNum: 0,
                content: "导论作业内容是什么",
                title: "作业求助"
            }
        ]
    };
});

Mock.mock(/\/note\/getNote/, 'get', (options) => {
    return {
        notes: [
                {
                    noteId: 1,
                    studentId: 1,
                    courseId: 1,
                    content: "第三次课教学笔记",
                    noteTitle: "数据结构笔记"
                },
                {
                    noteId: 2,
                    studentId: 1,
                    courseId: 1,
                    content: "第四次笔记",
                    noteTitle: " 数据结构笔记2"
                }
        ]  
    }
})

Mock.mock(/\/student\/course\/homework/,'get',(options)=>{
    return {
        homeworkList: [
            {
                homeworkId: 7,
                courseId: 1,
                studentNum: "852464",
                grade: null,
                avgGrade: null,
                mutualGrade: null,
                content: "请尽快提交",
                homeworkNum: 1,
                submissionDeadline: "2024-11-08T23:59:59.000+00:00",
                studentContent: null
            },
            {
                homeworkId: 1,
                courseId: 1,
                studentNum: "852464",
                grade: null,
                avgGrade: null,
                mutualGrade: null,
                content: "请尽快提交作业2",
                homeworkNum: 2,
                submissionDeadline: "2024-11-08T23:59:59.000+00:00",
                studentContent: null
            }
        ]

    }
})
// 提交作业接口
Mock.mock(/\/student\/course\/homework\/upload/, 'post', (options) => {

    // 模拟一个成功的响应
    return {
      message: "作业上传成功",
    };
  });
export default Mock;