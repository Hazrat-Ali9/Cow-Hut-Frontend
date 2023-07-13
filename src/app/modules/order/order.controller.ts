import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IOrder } from './order.interface';
import { OrderService } from './order.service';

const cowOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const cow: IOrder = req.body;

    const result = await OrderService.cowOrder(cow);

    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow Ordered successfully!',
      data: result,
    });
  }
);

const getAllOrders: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as JwtPayload;
    const result = await OrderService.getAllOrders(user);

    sendResponse<IOrder[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Orders fetched successfully!',
      data: result,
    });
  }
);

const getOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req.user as JwtPayload)
    const id = req.params.id;
    const result = await OrderService.getOrders(id, user);

    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order information retrieved successfully',
      data: result,
    });
  }
);

export const OrderController = {
  cowOrder,
  getAllOrders,
  getOrder,
};
