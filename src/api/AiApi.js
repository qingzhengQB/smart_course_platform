import axios from "axios";

export const getAiAnswer = async (userInput) => {
    try {
        const response = await axios.get('http://localhost:8000/ai/courseAi', {
            params:{
                question: userInput
            }
        }); 
        return response.data;
    } catch (error) {
        throw error;
    }
}