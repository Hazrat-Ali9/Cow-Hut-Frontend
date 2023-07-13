import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';
import { JwtPayload } from 'jsonwebtoken';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {

    const user: IUser = req.body;

    const result = await UserService.createUser(user);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);

const getAllUsers = catchAsync(async (req: Request, res: Response) => {

  const result = await UserService.getAllUsers();

  const message =
    result.length > 0
      ? 'User retrieved successfully !'
      : 'No user founded';

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: message,
    data: result,
  });
});


const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.getSingleUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully !',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {

  const result = await UserService.getMyProfile(req.user as JwtPayload);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrieved successfully",
    data: result,
  });

});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const updatedData = req.body;

  const result = await UserService.updateMyProfile(
    req.user as JwtPayload,
    updatedData
  );

  sendResponse<Pick<IUser, 'name' | 'phoneNumber' | 'address'>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information updated successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await UserService.updateUser(id, updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  });
});


const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.deleteUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully !',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile
};
