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
// 修正正则表达式并模拟获取通知的接口
Mock.mock(/\/teacher\/getNotification/, 'get', (options) => {
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
Mock.mock(/\/teacher\/courses/, 'get', (options) => {
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
                postId:3,
                postTitle: "算法疑问",
                courseName: "数据结构",
                likeNum: 90,
                favoNum: 5,
                content: "迪杰斯特拉算法的具体过程",
                favoriteName: "金的收藏夹"
            },
            {
                postId: 3,
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
// 获取作业附件接口
Mock.mock(/\/student\/course\/homework\/attachments/, 'get', (options) => {
    const { courseId, homeworkId } = options.query; // 获取请求参数
    let attachments = [];

    // 根据 homeworkId 返回不同的附件
    if (homeworkId === '1') {
        attachments = [
            { name: '作业说明.pdf', url: 'http://localhost:8000/files/homework1.pdf' },
            { name: '参考资料.docx', url: 'http://localhost:8000/files/reference.docx' },
        ];
    } else if (homeworkId === '2') {
        attachments = [
            { name: '作业说明2.pdf', url: 'http://localhost:8000/files/homework2.pdf' },
            { name: '参考资料2.docx', url: 'http://localhost:8000/files/reference2.docx' },
        ];
    }
    // 继续添加其他作业 ID 的附件数据

    return {
        attachments, // 返回对应的附件数据
    };
});
// 提交作业接口
Mock.mock(/\/student\/course\/homework\/upload/, 'post', (options) => {

    // 模拟一个成功的响应
    return {
      message: "作业上传成功",
    };
});
  
//课程介绍
Mock.mock(/\/course\/intro/, 'get', (options) => {
    return {
        intro: "2024学期课程,主要讲解常见的数据结构，如栈堆等。"
    }
})
//课程通知
Mock.mock(/\/course\/notification/, 'get', (options) => {
    return {
        notifications : {
            notificationId: 1,
            teacherId: 1,
            content: "作业1已布置",
            createTime: "2024-10-31T22:15:58",
            title: "通知1",
            courseId: 1
          }
    }
})
//课程评论
Mock.mock(/\/course\/discussion/, 'get', (options) => {
    return {
        posts: [
            {
                postId: 1,
                courseId: 1,
                studentName: "金安琪",
                likeNum: 90,
                favoNum: 5,
                content: "迪杰斯特拉算法的具体过程",
                title: "算法疑问"
            },
            {
                postId: 3,
                courseId: 1,
                studentName: "韩嘉伦",
                likeNum: 1,
                favoNum: 0,
                content: "求电子版教材资源，各个版本都可以",
                title: "求电子版教材资源"
            }
        ]
    }
})
//课程评论详情
Mock.mock(/\/course\/discussionById/, 'get', (options) => {
    return {
        postComments: [
            {
              commentId: 1,
              postId: 3,
              likeNum: 1,
              content: "同求",
              commentedNum: "342680",
              teacherId: null,
              studentId: 1,
              commentedName: "韩嘉伦",
              studentName: "金安琪",
              teacherName: null
            },
            {
              commentId: 2,
              postId: 3,
              likeNum: 0,
              content: "蹲有回复踢我",
              commentedNum: "342680",
              teacherId: null,
              studentId: 1,
              commentedName: "韩嘉伦",
              studentName: "金安琪",
              teacherName: null
            },
            {
              commentId: 3,
              postId: 3,
              likeNum: 5,
              content: "老师评论测试",
              commentedNum: "342680",
              teacherId: 1,
              studentId: null,
              commentedName: "韩嘉伦",
              studentName: null,
              teacherName: "孙詩涵"
            }
          ],
          postDetial: [
            {
              postId: 3,
              courseId: 1,
              studentName: "韩嘉伦",
              likeNum: 1,
              favoNum: 0,
              content: "求电子版教材资源，各个版本都可以",
              title: "求电子版教材资源"
              }
          ]
    }
})

// 模拟课程资源列表接口
Mock.mock(/\/course\/resource/, 'get', (options) => {
  const courseId = new URLSearchParams(options.url.split('?')[1]).get('courseId'); // 获取 courseId 参数

  // 生成模拟的课件列表
  return {
    resourceList: [
      {
        id: 1,
        fileName: `课件文件1-${courseId}.pdf`,
        fileType: 'application/pdf',
        size: '@integer(1000, 10000)', // 随机文件大小
        url: `http://localhost:8000/files/${courseId}/resource1.pdf`,
      },
      {
        id: 2,
        fileName: `课件文件2-${courseId}.pptx`,
        fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        size: '@integer(1000, 10000)', // 随机文件大小
        url: `http://localhost:8000/files/${courseId}/resource2.pptx`,
      },
      {
        id: 3,
        fileName: `课件文件3-${courseId}.docx`,
        fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        size: '@integer(1000, 10000)', // 随机文件大小
        url: `http://localhost:8000/files/${courseId}/resource3.docx`,
      },
    ],
  }
})

// 获取帖子详情
Mock.mock(/\/course\/discussionById/, "get", (options) => {
    const { postId } = options.params;
    const mockData = {
      postDetial: [
        {
          title: "课程讨论标题", // Post title
          studentName: "张三", // Student who created the post
          content: "这是课程讨论的详细内容，关于课程中的某个重要问题。", // Post content
          likeNum: 20, // Number of likes
          favoNum: 10, // Number of favorites
        },
      ],
      postComments: [
        {
          studentName: "李四",
          teacherName: null,
          commentedName: "张三",
          content: "这是李四的评论内容。",
          likeNum: 5,
          isLiked: false,
          commentId: 1,
        },
        {
          studentName: null,
          teacherName: "王老师",
          commentedName: "张三",
          content: "这是王老师的回复。",
          likeNum: 3,
          isLiked: false,
          commentId: 2,
        },
      ],
    };
  
    // Simulate a response with the provided postId
    return mockData;
  });
  
  Mock.mock(/\/course\/discussion\/postComment/, 'post', (options) => {
    // 模拟请求的 body
    const { postId, content, studentNum, teacherNum } = JSON.parse(options.body);
  
    // 检查参数
    if (!postId || !content) {
      return Mock.mock({
        status: 400,
        message: '缺少必要的参数',
      });
    }
  
    setTimeout(() => {
      const randomCommentId = Mock.Random.guid();  // 模拟生成一个评论ID
  
      // 返回模拟的评论数据
      return Mock.mock({
        status: 200,
        message: '评论提交成功',
        data: {
          commentId: randomCommentId,
          postId: postId,
          content: content,
          studentNum: studentNum || null,
          teacherNum: teacherNum || null,
          createdAt: Mock.Random.date('yyyy-MM-dd HH:mm:ss'),  // 模拟创建时间
        },
      });
    }, 1000);  // 模拟请求延迟
  });
  Mock.mock(/\/comment\/addLikeNum/, "post", (options) => {
    return { success: true, message: "点赞成功" };
  });
  
  Mock.mock(/\/comment\/decreaseLikeNum/, "post", (options) => {
    return { success: true, message: "取消点赞成功" };
  });
  
export default Mock;