import { Model } from 'mongoose';

export type TUserFullName = {
  firstName: string;
  lastName: string;
};

export type TUserAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TUserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TUserAddress;
};

export interface UserMethods {
  // eslint-disable-next-line no-unused-vars
  userExists(id: string): Promise<TUser | null>;
}

export interface TUserModel extends Model<TUser, Record<string, never>, UserMethods> {
  // eslint-disable-next-line no-unused-vars
  isUser(id: number): Promise<TUser | null>;
}
