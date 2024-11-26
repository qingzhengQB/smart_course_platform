import axios from "axios";

export const getMyNote = async (userNum) => {
    try {
        const response = await axios.get('http://localhost:8000/note/getNote', {
            params: {
                studentNum: userNum
            }
        });
        return response.data;
    } catch (error) {
        console.error("笔记获取失败", error);
    } 
}

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
export const deleteCollectionOfPostByPostId = async (favoriteId) => {
    return (await axios.delete(`http://localhost:8000/student/deleteCollectionOfPost/${favoriteId}`)).data.message;
}
export const saveNewNote = async (userNum, mdEditTitle, mdEditContent) => {
    try {
        const encodedNoteTitle = encodeURIComponent(mdEditTitle); // 编码 note_title
        const encodedContent = encodeURIComponent(mdEditContent);     // 编码 content
        const response =  await axios.post("http://localhost:8000/student/saveNote", null, {
            params: {
                note_title: encodedNoteTitle,
                content: encodedContent,
                studentNum: userNum,
            }
        });
        return response.data;
    } catch (error) {
        console.log("保存笔记失败", error);
        throw error;
    }
};
export const deleteNoteByNoteId = async (noteId) => {
    return (await axios.delete(`http://localhost:8000/student/deleteNote/${noteId}`)).data.message;
}
export default {
    getPosts,  
    getMyComments,
    getMyFavourite,
    getMyNote,
    deleteCollectionOfPostByPostId,
    saveNewNote,
    deleteNoteByNoteId
};