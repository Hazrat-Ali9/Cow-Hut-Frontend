/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type adminRole = 'admin';

export type IAdmin = {
  role: adminRole;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  phoneNumber: string;
};

export type ILoginAdminResponse = {
  accessToken: string;
  refreshToken: string;
};
export type IAccessTokenResponse = {
  accessToken: string;
};


export type IAdminLoginPayload = {
  phoneNumber: string;
  password: string;
};

export type AdminModel = {
  isAdminExists(
    phoneNumber: string
  ): Promise<Pick<IAdmin, 'phoneNumber' | 'password' | 'role'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;

// export type AdminModel = Model<IAdmin, Record<string, unknown>>;
