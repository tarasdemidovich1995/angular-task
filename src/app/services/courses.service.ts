import { Injectable } from '@angular/core';
import { Course } from '../interfaces';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  public list: Course[] = [
    {
      id: '1',
      title: 'Video course 1',
      creationDate: moment().day(-5),
      duration: 60,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      topRated: true,
    },
    {
      id: '2',
      title: 'Video course 2',
      creationDate: moment().day(+5),
      duration: 120,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id: '3',
      title: 'Video course 3',
      creationDate: moment(),
      duration: 180,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ];

  constructor() { }

  getList(): void {

  }

  create(): void {

  }

  getById(): void {

  }

  update(): void {

  }

  remove(id: string): void {
    this.list = this.list.filter((course) => course.id !== id);
  }
}
