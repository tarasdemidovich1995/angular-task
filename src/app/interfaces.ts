export interface Course {
  id?: string;
  title: string;
  creationDate: moment.Moment;
  duration: number;
  description: string;
  topRated?: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export type Direction = 'direct' | 'reverse';
