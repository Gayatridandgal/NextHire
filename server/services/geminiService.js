// server/services/geminiService.js
const axios = require('axios');
require('dotenv').config();

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

exports.getGeminiResponse = async (prompt) => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );
    return response.data.candidates[0].content.parts[0].text;
  } catch (err) {
    console.error('Gemini error:', err.message);
    throw new Error('Gemini API call failed');
  }
};
