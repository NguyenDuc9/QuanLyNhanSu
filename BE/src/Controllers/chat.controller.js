// Giả định bạn đã cấu hình kết nối database trong file config
const db = require('../config/config');

// 1. API Lấy lịch sử chat giữa 2 người
exports.getChatHistory = async (req, res) => {
  try {
    const { nguoiGui, nguoiNhan } = req.query;

    // Câu lệnh SQL lấy tin nhắn qua lại giữa admin và khách hàng, sắp xếp theo thời gian tăng dần
    const sql = `
      SELECT MaTinNhan, MaNguoiGui, MaNguoiNhan, NoiDung, NgayGui 
      FROM tinnhan 
      WHERE (MaNguoiGui = ? AND MaNguoiNhan = ?) 
         OR (MaNguoiGui = ? AND MaNguoiNhan = ?)
      ORDER BY NgayGui ASC
    `;

    const [rows] = await db.execute(sql, [
      nguoiGui,
      nguoiNhan,
      nguoiNhan,
      nguoiGui,
    ]);

    return res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('Lỗi lấy lịch sử chat:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Lỗi máy chủ nội bộ' });
  }
};

// 2. API Lưu tin nhắn mới vào CSDL (Dùng khi gửi qua HTTP hoặc gọi từ Socket)
exports.saveNewMessage = async (data) => {
  try {
    const sql = `
      INSERT INTO tinnhan (MaNguoiGui, MaNguoiNhan, NoiDung, NgayGui) 
      VALUES (?, ?, ?, NOW())
    `;
    const [result] = await db.execute(sql, [
      data.MaNguoiGui,
      data.MaNguoiNhan,
      data.NoiDung,
    ]);

    // Trả về ID tin nhắn vừa tạo và thời gian hiện tại
    return {
      MaTinNhan: result.insertId,
      NgayGui: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Lỗi lưu tin nhắn:', error);
    throw error;
  }
};
