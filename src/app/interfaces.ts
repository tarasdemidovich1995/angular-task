export interface Author {
  id: string;
  name: string;
}

export interface Course {
  id: number;
  name: string;
  date: moment.Moment;
  length: number;
  description: string;
  authors?: Author[];
  isTopRated?: boolean;
}

export interface CoursesInfo {
  count: number;
}

export interface CourseRequest {
  id: number;
  name: string;
  date: string;
  length: number;
  description: string;
  authors?: Author[];
  isTopRated?: boolean;
}

export interface NameModel {
  firstName: string;
  lastName: string;
}

export interface User {
  id: string;
  token?: string;
  name: NameModel;
  login: string;
  password: string;
}

export interface UserResponse {
  token: string;
}

export interface AuthResponse {
  login: string;
  password: string;
}

export interface AuthRequest {
  token: string;
}

export interface Alert {
  type: string;
  text: string;
}

export type AlertType = 'success' | 'warning' | 'danger';

export type Direction = 'direct' | 'reverse';
