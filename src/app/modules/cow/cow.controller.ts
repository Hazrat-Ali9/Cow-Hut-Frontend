import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ICow } from './cow.interface';
import { CowService } from './cow.service';
import { paginationFields } from '../../../constants/pagination';
import { cowFilterableFields } from './cow.constants';
import { JwtPayload } from 'jsonwebtoken';

const addCow: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {

    const cow: ICow = req.body;

    const result = await CowService.addCow(cow);

    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow added successfully!',
      data: result,
    });
  }
);

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CowService.getAllCows(filters, paginationOptions);

  const message =
    result.data.length > 0 ? 'Cow retrieved successfully !' : 'No cow founded';

  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: message,
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await CowService.getSingleCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow retrieved successfully !',
    data: result,
  });
});

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const userId = (req.user as JwtPayload).id

  const result = await CowService.updateCow(id, updatedData, userId);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow updated successfully !',
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = (req.user as JwtPayload).id;
  const result = await CowService.deleteCow(id, userId);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow deleted successfully !',
    data: result,
  });
});

export const CowController = {
  addCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow
};
