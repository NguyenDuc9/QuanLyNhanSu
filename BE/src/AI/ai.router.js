const express = require('express');
const db = require('../config/config.js');
const { OpenAI } = require('openai'); // Dùng OpenAI SDK cho OpenRouter

const router = express.Router();

// Khởi tạo cấu hình kết nối tới OpenRouter
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.AI_API_KEY, // Bạn dán mã sk-or-... vào biến này trong file .env nhé
});

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập tin nhắn (message)!',
      });
    }

    // Lấy dữ liệu nhân viên từ database mysql2
    const [employees] = await db.promise().query(`
      select*from NhanVien
    `);

    // Tạo Prompt cung cấp dữ liệu cho AI làm ngữ cảnh
    const prompt = `
    Bạn là AI Assistant cho hệ thống quản lý nhân sự.

    Đây là dữ liệu nhân viên:
    ${JSON.stringify(employees, null, 2)}

    Câu hỏi của người dùng:
    "${message}"

    Hãy dựa vào dữ liệu nhân viên được cung cấp ở trên để trả lời câu hỏi. Trả lời ngắn gọn, thông minh, chính xác và bằng tiếng Việt.
    `;
    console.log('OPENROUTER_API_KEY:', process.env.OPENROUTER_API_KEY);
    console.log('Length:', process.env.OPENROUTER_API_KEY?.length);
    // Gọi model Gemini 1.5 Flash thông qua OpenRouter
    const response = await openai.chat.completions.create({
      model: 'openai/gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const responseText = response.choices[0].message.content;

    // Trả kết quả về cho client
    res.json({
      success: true,
      answer: responseText,
    });
  } catch (error) {
    console.error('Lỗi server AI (OpenRouter):', error);

    res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống AI, vui lòng thử lại sau.',
      error: error.message,
    });
  }
});

module.exports = router;
