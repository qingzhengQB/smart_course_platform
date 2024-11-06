import axios from 'axios';
// 获取通知列表的 API
export const getNotifications = async (userNum) => {
  try {
    const response = await axios.get('http://localhost:8000/student/getNotification', {
        params:{
          studentNum: userNum
        }
    }); 
    return response.data; // 返回通知列表数据
  } catch (error) {
    console.error("获取通知失败:", error);
    throw error; // 抛出错误以便调用者处理
  }
};

// 获取课程列表的 API
export const getCourses = async (userNum) => {
  try {
    const response = await axios.get('http://localhost:8000/student/courses', {
        params: {
            studentNum: userNum
        }
    });
    
    return response.data; // 返回课程列表数据
  } catch (error) {
    console.error("获取课程失败:", error);
    throw error; // 抛出错误以便调用者处理
  }
};

// 导出所有 API 请求
export default {
    getNotifications,
    getCourses,
};