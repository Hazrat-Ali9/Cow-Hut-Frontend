import { Secret } from 'jsonwebtoken';
import config from '../config';
import { jwtHelpers } from './jwtHelpers';

export const getNewAccessToken = (
  phoneNumber: string,
  role: string
): string => {
  const newAccessToken = jwtHelpers.createToken(
    {
      phoneNumber,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return newAccessToken;
};
