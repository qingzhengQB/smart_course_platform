import axios from "axios";

export const getMyHomework = async (userNum) => {
    try {
        const response = await axios.get('http://localhost:8000/course/getHomework', {
            params: {
                studentNum: userNum
            }
        });
        return response.data;
    } catch (error) {
        console.error("作业获取失败", error);
    } 
}