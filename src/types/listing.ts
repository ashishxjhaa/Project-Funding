import { Types } from "mongoose";

export type ListingType = {
  _id: string;
  user: Types.ObjectId | string;
  name: string;
  description: string;
  tags: string[];
  funds: number;
  likes: number;
  link?: string;
  createdAt: Date;
};
