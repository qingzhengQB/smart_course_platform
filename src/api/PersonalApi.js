import axios from "axios";

export const getMyFavourite = async (userNum) => {
    try {
        const response = await axios.get('http://localhost:8000/favourite/getFavourite', {
            params: {
                studentNum: userNum
            }
        });
        return response.data;
        } catch(error) {
        console.error("获取我的收藏失败", error);
    }
}
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