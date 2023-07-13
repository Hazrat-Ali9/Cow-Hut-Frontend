/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type ICowLocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Khulna'
  | 'Sylhet'
  | 'Rangpur'
  | 'Mymensingh';

export type ICowBreed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej';

export type ICowLabel = 'for sale' | 'sold out';

export type ICowCategory = 'Dairy' | 'Beef' | 'Dual Purpose';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: ICowLocation;
  breed: ICowBreed;
  weight: number;
  label: ICowLabel;
  category: ICowCategory;
  seller?: Types.ObjectId;
};

// export type CowModel = Model<ICow, Record<string, unknown>>;

export type CowModel = {
  isCowAuthor(
    cowId: string,
    sellerId: string
  ): Promise<ICow>;
} & Model<ICow | null>;

export type ICowFilters = {
  searchTerm?: string;
  name?: string;
  age?: number;
  price?: number;
  location?: ICowLocation;
  breed?: ICowBreed;
  weight?: number;
  label?: ICowLabel;
  category?: ICowCategory;
  seller?: Types.ObjectId;
};
