import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (user: IUser): Promise<IUser | undefined | null> => {
  if (!user.income) {
    user.income = 0;
  }
  const createdUser = await User.create(user)

  if (!createdUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
  }
  
  if (createdUser) {
    const newUserData = await User.findById(createdUser.id);
    return newUserData;
  }

};

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find();
  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

const getMyProfile = async (user: JwtPayload): Promise<IUser | null> => {
  const result = await User.findById(user.id, {
    name: 1,
    phoneNumber: 1,
    address: 1,
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  return result;
};

const updateMyProfile = async (
  user: JwtPayload,
  payload: Partial<IUser>
): Promise<Pick<IUser, 'name' | 'phoneNumber' | 'address'> | null> => {
  const result = await User.findByIdAndUpdate(user.id, payload, {
    new: true,
    projection: {
      name: 1,
      phoneNumber: 1,
      address: 1,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found !');
  }

  return result;
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
};
