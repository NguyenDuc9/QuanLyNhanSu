# Hướng dẫn test luồng xác thực theo quyền

## Cấu hình cần thiết

- **Base URL**: `http://localhost:3000`
- **JWT_SECRET**: Phải có trong file `.env`
- **Vai trò trong DB**: Cột `VaiTro` trong bảng `TaiKhoan` phải dùng: `ADMIN`, `STAFF`, `USER`, `MANAGER`

---

## Sơ đồ luồng

```
POST /api/auth/login     → Lấy accessToken + refreshToken (công khai)
POST /api/auth/refresh   → Lấy accessToken mới (công khai, cần refreshToken)

GET  /api/users/profile  → Xem profile (cần token, role: ADMIN|STAFF|USER|MANAGER)
POST /api/admin/register → Đăng ký tài khoản mới (chỉ ADMIN)
```

---

## 1. Test Login (công khai)

```powershell
$body = @{
  TenDangNhap = "admin"
  MatKhau = "123456"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

**Kết quả mong đợi**: `accessToken`, `refreshToken`, `user`

---

## 2. Test Refresh Token

```powershell
$body = @{ refreshToken = "YOUR_REFRESH_TOKEN" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/auth/refresh" -Method POST -Body $body -ContentType "application/json"
```

---

## 3. Test theo từng quyền

### Bước 0: Đăng nhập để lấy token

```powershell
# Đăng nhập tài khoản ADMIN
$loginResp = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST `
  -Body '{"TenDangNhap":"admin","MatKhau":"123456"}' -ContentType "application/json"

$token = $loginResp.accessToken
```

### 3.1 GET /api/users/profile (ADMIN, STAFF, USER, MANAGER)

**Header**: `Authorization: Bearer <token>`

```powershell
$headers = @{ Authorization = "Bearer $token" }
Invoke-RestMethod -Uri "http://localhost:3000/api/users/profile" -Method GET -Headers $headers
```

| Quyền  | Kỳ vọng         |
|--------|------------------|
| ADMIN  | 200 OK           |
| STAFF  | 200 OK           |
| USER   | 200 OK           |
| MANAGER| 200 OK           |
| (không token) | 401 Chưa đăng nhập |

### 3.2 POST /api/admin/register (chỉ ADMIN)

```powershell
$headers = @{ Authorization = "Bearer $token" }
$body = @{
  TenDangNhap = "nv001"
  MatKhau = "123456"
  MaNV = "NV001"
  VaiTro = "STAFF"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/admin/register" -Method POST -Headers $headers -Body $body -ContentType "application/json"
```

| Quyền  | Kỳ vọng                    |
|--------|-----------------------------|
| ADMIN  | 201 Đăng ký thành công     |
| STAFF  | 403 Bạn không có quyền truy cập |
| USER   | 403 Bạn không có quyền truy cập |
| (không token) | 401 Chưa đăng nhập  |

---

## 4. Test các trường hợp lỗi

### Token không hợp lệ

```powershell
$headers = @{ Authorization = "Bearer invalid_token_here" }
Invoke-RestMethod -Uri "http://localhost:3000/api/users/profile" -Method GET -Headers $headers
# → 401 Token không hợp lệ
```

### Thiếu header Authorization

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/users/profile" -Method GET
# → 401 Chưa đăng nhập hoặc định dạng token sai
```

### Token đã hết hạn

- Đợi 1h sau khi login (hoặc sửa `expiresIn` trong code để test nhanh)
- Gọi API với token cũ → 401 Token đã hết hạn
- Dùng `/api/auth/refresh` để lấy token mới

---

## 5. Chuẩn bị dữ liệu test trong DB

Đảm bảo bảng `TaiKhoan` có `VaiTro` khớp với constants:

```sql
-- Tạo tài khoản admin (mật khẩu: 123456, đã hash bcrypt)
INSERT INTO taikhoan (TenDangNhap, MatKhau, MaNV, VaiTro) 
VALUES ('admin', '$2a$10$...', 'AD001', 'ADMIN');
```

Lưu ý: Mật khẩu phải hash bằng bcrypt. Hoặc dùng API register (tài khoản admin đầu tiên phải insert trực tiếp DB).
