import axios from 'axios';
//import API_BASE_URL from '@/config/apiConfig';

const loginApi = async (username, password, userType) => {
  const identification = userType === "student" ? "1" : "0"; // 识别身份
  const loginData = new URLSearchParams();
  loginData.append('userNum', username); // 字段名与后端一致
  loginData.append('password', password);

  try {
    const response = await axios.post('http://localhost:8000/login', loginData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // 设置请求头为表单编码
      }
    });

    return response.data; // 返回响应数据
  } catch (error) {
    throw new Error("Error during login: " + error.message);
  }
};

export default loginApi;
