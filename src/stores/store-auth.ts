import { defineStore } from 'pinia';
import { RegisterUser } from '../types/User';

export const useAuthStore = defineStore('auth', () => {
  const registerUser = (payload: RegisterUser) => {
    console.log(payload);
  };
  return { registerUser };
});
