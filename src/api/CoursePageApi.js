import axios from "axios";

export const fetchMyHomework = async (userNum) => {
    try {
        const response = await axios.get('http://localhost:8000/course/homework', {
            params: {
                studentNum: userNum
            }
        });
        return response.data;
    } catch (error) {
        console.error("作业获取失败", error);
    } 
}

export const submitHomework = async (homeworkId, content, attachments) => {
    try {
      const response = await axios.post('http://localhost:8000/course/submitHomework', {
        homeworkId,
        content,
        attachments,
      });
      return response.data;
    } catch (error) {
      console.error("提交作业失败:", error);
      throw error;
    }
  };
  // 导出所有 API 请求
export default {
    fetchMyHomework,
    submitHomework
};