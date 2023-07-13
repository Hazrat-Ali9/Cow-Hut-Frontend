/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type IUser = {
  phoneNumber: string;
  role: 'seller' | 'buyer';
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: number;
};

// export type UserModel = Model<IUser, Record<string, unknown>>;

export type UserModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IUser & { id: string }, 'password' | 'role' | 'phoneNumber' | "id">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;

export type IUserFilters = {
  searchTerm?: string;
  id?: string;
  price?: string;
  contactNo?: string;
  location?: string;
};
