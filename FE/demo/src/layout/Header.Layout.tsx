import '../style/Header.layout.css';
export default function HeaderLayout() {
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    window.location.href = '/auth/login';
  };
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const MaNV = user.MaNV || 'Unknown User';
  function updateTime() {
    const date = new Date();

    const time =
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds() +
      ' ' +
      date.getDate() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getFullYear();

    document.getElementById('clock')!.innerText = time;
  }

  // chạy mỗi 1 giây
  setInterval(updateTime, 1000);
  return (
    <div>
      <div className="layout-header">
        <div>
          <h2>Hệ thống quản lý nhân sự</h2>
        </div>
        <div>
          <p>Xin chào, {MaNV}</p>
          <p id="clock"></p>
        </div>
        <div>
          <input type="button" onClick={logout} value="Đăng xuất" />
        </div>
      </div>
    </div>
  );
}
