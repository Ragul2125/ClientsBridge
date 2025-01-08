// src/api/conversationApi.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL; 
const Token = localStorage.getItem("token");

export const fetchAllConversations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/admin/conversations/getconversations`, {
      headers: {
        'Authorization': `Bearer ${Token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

export const fetchConversationById = async (conversationId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/admin/conversations/getconversations/${conversationId}`, {
      headers: {
        'Authorization': `Bearer ${Token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching conversation:', error);
    throw error;
  }
};
