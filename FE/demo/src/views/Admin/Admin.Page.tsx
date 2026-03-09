import '../../style/admin/MainPage.admin.css';
import HeaderLayout from '../../layout/Header.Layout';
import SidebarAdmin from '../../layout/Sidebar.Admin';
import MainPage from './MainPage';
export default function AdminPage() {
  return (
    <div className="main-page">
      <div className="layout">
        <div className="header">
          <HeaderLayout />
        </div>
        <div className="sidebar">
          <SidebarAdmin />
        </div>
        <div className="content">
          <MainPage />
        </div>
      </div>
    </div>
  );
}
