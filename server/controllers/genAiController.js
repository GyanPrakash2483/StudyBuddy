const axios = require("axios");
require("dotenv").config();

const getGeminiResponse = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: "API Key is missing in .env file" });
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await axios.post(apiUrl, {
            contents: [{ parts: [{ text: prompt }] }]
        });

        console.log("Gemini API Response:", response.data);

        const aiResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

        res.status(200).json({ response: aiResponse });
    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || "Failed to fetch response from Gemini AI" });
    }
};


module.exports = { getGeminiResponse };
