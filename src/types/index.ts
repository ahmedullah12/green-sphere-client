import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IPost {
  _id: string;
  title: string;
  images: string[];
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
  _id: string
  name: string
  email: string
  profilePhoto: string
  role: string
  followers: IUser[]
  following: IUser[]
  isDeleted: boolean
  isVerified: boolean
  createdAt: string
  updatedAt: string
  __v: number
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