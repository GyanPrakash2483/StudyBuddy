const express = require('express');
const router = express.Router();
const { getGeminiResponse  } = require("../controllers/genAiController")



router.post("/response",getGeminiResponse )

module.exports = router;
