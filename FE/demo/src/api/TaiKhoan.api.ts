import api from './api';
export const getAllTaiKhoan = async () => {
  const response = await api.get('api/tai-khoan/get-all');
  return response.data;
};
