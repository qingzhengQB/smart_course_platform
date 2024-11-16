import axios from "axios";
export const fetchMyHomework = async (userNum,courseId) => {
    try {
        const response = await axios.get('http://localhost:8000/student/course/homework', {
          params: {
              courseId:Number(courseId),
              studentNum: userNum
            }
        });
        return response.data;
    } catch (error) {
        console.error("作业获取失败", error);
    } 
}


export const submitHomework = async (homeworkId, homeworkContent, attachments) => {
  try {
    // 创建 FormData 对象
    const formData = new FormData();
    
    // 将作业 ID 和学生内容添加到 FormData
    formData.append('homeworkId', Number(homeworkId));  // 作业 ID
    formData.append('studentContent', String(homeworkContent));  // 学生提交的内容

    // 检查附件并添加到 FormData
    if (attachments && attachments.length > 0) {
      attachments.forEach(file => {
        if (file instanceof File) {
          formData.append('files', file);  // 上传多个文件，字段名为 'files'，每个文件作为一个条目
        }
      });
    } else {
      console.error("未选择有效文件");
      return;
    }

    // 调试输出 FormData 内容，检查数据是否正确
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // 发送 POST 请求，提交表单数据
    const response = await axios.post('http://localhost:8000/student/course/homework/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // 确保请求头为 multipart/form-data
      }
    });

    // 返回响应的数据
    return response.data;
  } catch (error) {
    console.error("提交作业失败:", error);
    throw error;  // 抛出错误，调用者可以进一步处理
  }
};

export const getCourseNotification = async (courseId) => {
  try {
    const response = await axios.get('http://localhost:8000/course/notification', {
      params: {
          courseId:Number(courseId),
        }
    });
      return response.data;
    } catch (error) {
        console.error("课程通知获取失败", error);
    } 
};

export const getCourseDiscussion = async (courseId) => {
  try {
    const response = await axios.get('http://localhost:8000/course/discussion', {
      params: {
        courseId: Number(courseId),
      }
    });
    return response.data;
  } catch (error) {
    console.error("获取讨论区失败", error);
  }
};

export const getCoursePostDetial = async (postId) => {
  try {
    const response = await axios.get('http://localhost:8000/course/discussionById', {
      params: {
        postId: Number(postId),
      }
    });
    return response.data;
  } catch (error) {
    console.error("获取帖子详情失败");
  }
};

export const getCourseIntro = async (courseId) => {
  try {
    const response = await axios.get('http://localhost:8000/course/intro', {
      params: {
        courseId:Number(courseId),
      }
    });
    return response.data;
  } catch (error) {
    console.error("获取课程介绍失败", error);
  }
}

export const getCourseWareList = async (courseId) => {
  try {
    const response = await axios.get('http://localhost:8000/course/resource', {
      params: {
        courseId:Number(courseId),
      }
    });
    return response.data;
  } catch (error) {
    console.error("获取课件列表失败", error);
  }
}

//下载课程资源接口 资源下载逻辑都相同，可以使用同一个接口
export const downLoadCourseResource = async (resourceId) => {
  try {
    const response = await axios.get('http://localhost:8000/course/downLoadResource', {
      params: {
        resourceId: Number(resourceId),
      },
    });
    return response.data;
  } catch (error) {
    console.error("获取下载资源URL失败", error);
  }
}
//获取试题集列表
export const getCourseWorkSetList = async (courseId) => {
  try {
    const response = await axios.get('http://localhost:8000/course/resource/workSet', {
      params: {
        courseId:Number(courseId),
      }
    });
    return response.data;
  } catch (error) {
    console.error("获取课件列表失败", error);
  }
}


//获取大纲接口
export const getCourseOutLine = async (courseId) => {
  try {
    const response = await axios.get('http://localhost:8000/course/outline', {
      params: {
        courseId: Number(courseId),
      },
    });
    return response.data;
  } catch (error) {
    console.error("获取资源URL失败", error);
  }
}
//获取教学日历
export const getCourseCalendar = async (courseId) => {
  try {
    const response = await axios.get('http://localhost:8000/course/calendar', {
      params: {
        courseId: Number(courseId),
      },
    });
    return response.data;
  } catch (error) {
    console.error("获取资源URL失败", error);
  }
}

export const sendNotification = async (title, content, teacherNum,courseId) => {
  try {
    const response = await axios.post("http://localhost:8000/teacher/sendNotification", null, {
      params: {
        title: title,
        content: content,
        teacherNum: teacherNum,
        courseId: Number(courseId),
      }
    });

    console.log("API 响应:", response.data);  // 输出响应数据调试
    return response.data;  // 返回响应数据
  } catch (error) {
    console.error("发送通知失败", error);
    throw error;  // 抛出错误，捕获异常
  }
};
  // 导出所有 API 请求
export default {
  fetchMyHomework,
  submitHomework,
  getCourseNotification,
  getCourseDiscussion,
  getCoursePostDetial,
  getCourseIntro,
  getCourseWareList,
  downLoadCourseResource,
  getCourseWorkSetList,
  getCourseOutLine,
  getCourseCalendar
};