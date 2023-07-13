import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { getNewAccessToken } from '../../../helpers/getNewAccessToken';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Admin } from '../admin/admin.model';
import { User } from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;

  const isUserExist = await User.isUserExist(phoneNumber);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { phoneNumber: userPhoneNumber, role, id } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { phoneNumber: userPhoneNumber, role, id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { phoneNumber: userPhoneNumber, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  //verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { phoneNumber } = verifiedToken;

  // checking deleted user's refresh token

  const isUserExist = await User.isUserExist(phoneNumber);
  const isAdminExist = await Admin.isAdminExists(phoneNumber);
  if (!isUserExist && !isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //generate new token
  let newAccessToken = '';
  if (isUserExist) {
    newAccessToken = getNewAccessToken(
      isUserExist.phoneNumber,
      isUserExist.role
    );
  } else if (isAdminExist) {
    newAccessToken = getNewAccessToken(
      isAdminExist.phoneNumber,
      isAdminExist.role
    );
  }

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
