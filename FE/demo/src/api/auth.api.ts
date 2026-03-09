import type { LoginRequest } from '../model/dto/auth.dto';
import api from './api';
export const Login = async (data: LoginRequest) => {
  const response = await api.post('api/auth/login', data);
  return response.data;
};
