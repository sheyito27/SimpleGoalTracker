export type User = {
  id: string;
  username: string;
  passwordHash: string;
  name: string;
  email: string;
  birthDate: Date;
  isActive: boolean;
  createdAt: Date;
};