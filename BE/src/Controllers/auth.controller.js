const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/config');

exports.register = async (req, res) => {
  const { TenDangNhap, MatKhau, MaNV, VaiTro } = req.body;
  req.body.VaiTro = req.body.VaiTro ? req.body.VaiTro.toLowerCase() : null;
  if (!TenDangNhap || !MatKhau) {
    return res.status(400).json({ message: 'Thiếu thông tin đăng ký' });
  }

  try {
    // Check tên đăng nhập - PHẢI ĐỢI kết quả trước khi insert
    const [users] = await db
      .promise()
      .query('SELECT * FROM taikhoan WHERE TenDangNhap = ?', [TenDangNhap]);
    if (users && users.length > 0) {
      return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
    }

    const hash = await bcrypt.hash(MatKhau, 10);
    await db
      .promise()
      .query(
        'INSERT INTO taikhoan (TenDangNhap, MatKhau, MaNV, VaiTro) VALUES (?, ?, ?, ?)',
        [TenDangNhap, hash, MaNV || null, VaiTro || null],
      );
    return res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi server' });
  }
};
exports.login = (req, res) => {
  const { TenDangNhap, MatKhau } = req.body;

  console.log(req.body);
  if (!TenDangNhap || !MatKhau) {
    return res.status(400).json({ message: 'Thiếu thông tin đăng nhập' });
  }
  db.query(
    'select * from TaiKhoan where TenDangNhap = ?',
    [TenDangNhap],
    async (err, users) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      if (users.length === 0) {
        return res.status(404).json({ message: 'Tài khoản of mk không dung' });
      }
      const user = users[0];
      const ok = await bcrypt.compare(MatKhau, user.MatKhau);
      if (!ok) {
        return res.status(401).json({ message: 'Tài khoản of mk không dung' });
      }

      // tao access token
      const accessToken = jwt.sign(
        {
          id: user.MaNV,
          role: user.VaiTro,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
      );

      // const refreshToken = jwt.sign(
      //   {
      //     id: user.TenDangNhap,
      //     role: user.VaiTro,
      //   },
      //   process.env.JWT_SECRET,
      //   { expiresIn: '7d' },
      // );
      return res.status(200).json({
        accessToken,
        // refreshToken,
        user: {
          TenDangNhap: user.TenDangNhap,
          MaNV: user.MaNV,
          VaiTro: user.VaiTro,
        },
      });
    },
  );
};

// Lấy thông tin user hiện tại (cần auth)
exports.profile = (req, res) => {
  return res.json({
    user: req.user,
    message: 'Thông tin tài khoản đã đăng nhập',
  });
};

// Cấp lại access token bằng refresh token
exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: 'Thiếu refresh token' });
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: 'Refresh token không hợp lệ' });
    }
    // PHẢI có cả id và role để tạo access token mới (role middleware cần req.user.role)
    const newAccessToken = jwt.sign(
      { id: payload.id, role: payload.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );
    return res.json({ accessToken: newAccessToken });
  });
};
