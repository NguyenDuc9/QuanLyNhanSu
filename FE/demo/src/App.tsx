import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './views/auth/login';
import AdminPage from './views/Admin/Admin.Page';
import ManagerMainPage from './views/Manager/Manage.MainPage';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/main" element={<MainPage />} /> */}
          <Route path="auth/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/manager" element={<ManagerMainPage />} />

          {/* mặc định */}
          <Route path="/" element={<Navigate to="/auth/login" />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
