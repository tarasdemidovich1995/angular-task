import { Action } from '@ngrx/store';


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
  type: EAlert;
  text: string;
}

export enum EAlert {
  SUCCESS,
  WARNING,
  DANGER
}

export type Direction = 'direct' | 'reverse';

export class ActionPayload<T extends string, K> implements Action {
  constructor(readonly type: T, public payload?: K) {}
}
