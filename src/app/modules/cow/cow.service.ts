import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { User } from '../user/user.model';
import { cowSearchableFields } from './cow.constants';
import { ICow, ICowFilters } from './cow.interface';
import { Cow } from './cow.model';

const addCow = async (cow: ICow): Promise<ICow | null> => {
  const user = await User.findOne({
    _id: cow.seller,
    role: 'seller',
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found !');
  }
  const addedCow = await Cow.create(cow);

  if (!addedCow) {
    throw new ApiError(400, 'Failed to add cow');
  }
  return addedCow;
};

const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: typeof searchTerm === 'string' ? 'i' : undefined,
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        if (field === 'minPrice') {
          return { price: { $gte: value } };
        } else if (field === 'maxPrice') {
          return { price: { $lte: value } };
        }
        return {
          [field]: value,
        };
      }),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Cow.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id);
  return result;
};

const updateCow = async (
  id: string,
  payload: Partial<ICow>,
  userId: string
): Promise<ICow | null> => {
  const isExist = await Cow.isCowAuthor(id, userId);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Seller or cow not match !');
  }

  const result = await Cow.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteCow = async (id: string, userId: string): Promise<ICow | null> => {
  const isExist = await Cow.isCowAuthor(id, userId);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Seller or cow not match !');
  }

  const result = await Cow.findByIdAndDelete(id);
  return result;
};

export const CowService = {
  addCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
