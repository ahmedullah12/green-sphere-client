import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IPost {
  _id: string;
  title: string;
  image: string;
  description: string;
  userId: IUser;
  category: string[];
  tag: string;
  upvotes: string[];
  downvotes: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  profilePhoto: string;
  role: string;
  followers: IUser[];
  following: IUser[];
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
  disabled?: boolean;
}

export interface IComment {
  _id: string;
  comment: string;
  postId: string;
  userId: IUser;
}

export interface IPaymentPayload {
  userId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface IPayment {
  _id: string;
  userId: IUser;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalAmount: number;
  isConfirmed: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface IGroup {
  _id: string
  name: string
  description: string
  creator: IUser
  members: IUser[]
  avatar: string
  rules: any[]
  createdAt: string
  updatedAt: string
  __v: number
}