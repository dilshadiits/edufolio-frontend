import axios from 'axios';

const API_URL = 'https://edufolio-backend-w2yi.onrender.com/api';

export const addProgram = async (data) => {
    return await axios.post(`${API_URL}/admin/programs`, data);
};

export const uploadImage = async (formData) => {
    return await axios.post(`${API_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};