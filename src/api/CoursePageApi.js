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
    const response = await axios.get('http://localhost:8000/student/course/notification', {
      params: {
          courseId:Number(courseId),
        }
    });
      return response.data;
    } catch (error) {
        console.error("课程通知获取失败", error);
    } 
};

  // 导出所有 API 请求
export default {
  fetchMyHomework,
  submitHomework,
  getCourseNotification
};