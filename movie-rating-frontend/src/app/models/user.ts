export interface User {
  userId?: number;
  fullName: string;
  email: string;
  mobile: string;
  password?: string;
  role: string; // 'ADMIN' | 'USER'
}
