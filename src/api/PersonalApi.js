import axios from "axios";

export const getPosts = async (userNum) => {
    try {
        const response = await axios.get('http://localhost:8000/post/getPosts', {
            params: {
                studentNum: userNum
            }
        });
        return response.data;
    } catch (error) {
        console.error("帖子获取失败", error);
    }
};

export const getMyComments = async (userNum) => {
    try {
        const response = await axios.get('http://localhost:8000/comment/getComments', {
            params: {
                userNum: userNum
            }
        });
        return response.data;
    } catch (error) {
        console.error("我的评论获取失败", error);
    }
}
export default {
    getPosts,  
    getMyComments,
};