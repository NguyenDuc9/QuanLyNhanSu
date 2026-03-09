import '../../style/admin/MainPage.admin.css';
import HeaderLayout from '../../layout/Header.Layout';
import SidebarManager from '../../layout/Sidebar.Manager';
import ManagerMainPage from './Manage.MainPage';
export default function ManagerPage() {
  return (
    <div className="main-page">
      <div className="layout">
        <div className="header">
          <HeaderLayout />
        </div>
        <div className="sidebar">
          <SidebarManager />
        </div>
        <div className="content">
          <ManagerMainPage />
        </div>
      </div>
    </div>
  );
}
