const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 1. Bỏ qua các Route công khai không cần kiểm tra token
  // Thường là trang chủ hoặc endpoint đăng nhập (kiểm tra cả có hoặc không có tiền tố /api)
  const currentPath = req.path.toLowerCase();
  if (
    currentPath === '/' || 
    currentPath === '/auth/login' || 
    currentPath === '/api/auth/login'
  ) {
    return next();
  }

  // 2. Lấy token từ header Authorization
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      message: 'Không tìm thấy mã xác thực. Vui lòng đăng nhập lại.' 
    });
  }

  // Tách chuỗi để lấy JWT Token thực tế
  const token = authHeader.split(' ')[1];

  try {
    // 3. Giải mã token bẳng Secret Key từ file .env
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'YOUR_JWT_SECRET_KEY'
    );
    
    // Lưu thông tin user vào request object để các API/Controller phía sau có thể tái sử dụng
    req.user = decoded;

    // 4. Kiểm tra và phân quyền bảo vệ chéo dựa trên API Endpoint
    // (Đã loại bỏ tiền tố '/api' vì Express Router bóc tách phần này khi đi vào router con)
    const requestPath = req.path.toLowerCase();

    // Kiểm tra quyền Admin
    if (
      (requestPath.startsWith('/admin') || requestPath.startsWith('/api/admin')) && 
      decoded.VaiTro !== 'admin' && 
      decoded.VaiTro !== 'ADMIN'
    ) {
      return res.status(403).json({ 
        message: 'Tài khoản không có quyền truy cập vào khu vực Admin.' 
      });
    }

    // Kiểm tra quyền Manager
    if (
      (requestPath.startsWith('/manager') || requestPath.startsWith('/api/manager')) && 
      decoded.VaiTro !== 'manager'
    ) {
      return res.status(403).json({ 
        message: 'Tài khoản không có quyền truy cập vào khu vực Quản lý.' 
      });
    }

    // Kiểm tra quyền Staff (Nhân viên)
    if (
      (requestPath.startsWith('/staff') || requestPath.startsWith('/api/staff')) && 
      decoded.VaiTro !== 'staff'
    ) {
      return res.status(403).json({ 
        message: 'Tài khoản không có quyền của Nhân viên.' 
      });
    }

    // Kiểm tra quyền Department Head (Trưởng phòng)
    if (
      (requestPath.startsWith('/department_head') || requestPath.startsWith('/api/department_head')) && 
      decoded.VaiTro !== 'department_head'
    ) {
      return res.status(403).json({ 
        message: 'Tài khoản không có quyền của Trưởng phòng.' 
      });
    }

    // Nếu vượt qua tất cả các tầng kiểm tra, cho phép đi tiếp vào API Controller
    next();

  } catch (error) {
    return res.status(401).json({ 
      message: 'Mã xác thực không hợp lệ hoặc đã hết hạn.' 
    });
  }
};