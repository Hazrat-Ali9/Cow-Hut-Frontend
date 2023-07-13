import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IAccessTokenResponse } from './admin.interface';
import { AdminService } from './admin.service';

const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const admin = req.body;
    const result = await AdminService.createAdmin(admin);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully',
      data: result,
    });
  }
);

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body;

  const result = await AdminService.loginAdmin(loginData);

  const { refreshToken, ...others } = result;

  // cookie options
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IAccessTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin logged in successfully !',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AdminService.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IAccessTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'Admin logged in successfully !',
    data: result,
  });
});

export const AdminController = {
  createAdmin,
  loginAdmin,
  refreshToken,
};
