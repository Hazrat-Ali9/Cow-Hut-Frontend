import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import {
  IAccessTokenResponse,
  IAdmin,
  IAdminLoginPayload,
  ILoginAdminResponse,
} from './admin.interface';
import { Admin } from './admin.model';

const createAdmin = async (admin: IAdmin): Promise<IAdmin> => {
  const result = await Admin.create(admin);
  return result;
};

const loginAdmin = async (
  payload: IAdminLoginPayload
): Promise<ILoginAdminResponse> => {
  const { phoneNumber, password } = payload;

  const isAdminExist = await Admin.isAdminExists(phoneNumber);

  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist');
  }

  if (
    isAdminExist.password &&
    !(await Admin.isPasswordMatched(password, isAdminExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // create accessToken and refreshToken

  const { phoneNumber: adminPhoneNumber, role } = isAdminExist;

  const accessToken = jwtHelpers.createToken(
    {
      phoneNumber: adminPhoneNumber,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    {
      phoneNumber: adminPhoneNumber,
      role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IAccessTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { adminPhoneNumber } = verifiedToken;

  const isAdminExist = await Admin.isAdminExists(adminPhoneNumber);
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      phoneNumber: isAdminExist.phoneNumber,
      role: isAdminExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AdminService = {
  createAdmin,
  loginAdmin,
  refreshToken,
};
