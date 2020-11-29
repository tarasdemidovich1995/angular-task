
import { ActionPayload, Author, CourseRequest } from 'src/app/interfaces';

export enum CoursesActionsTypes {
  UPDATE_LIST = '[COURSE] update list',
  LOAD_COURSE = '[COURSE] load course',
  UPDATE_COURSE = '[COURSE] update course',
  DELETE_COURSE = '[COURSE] delete course',
  CREATE_COURSE = '[COURSE] create course',
  UPDATE_COUNT = '[COURSE] update count',
  UPDATE_AUTHORS = '[COURSE] update authors',
  CHANGE_PAGE = '[COURSE] change page',
  CHANGE_QUERY = '[COURSE] change query',
  CHANGE_EDIT_COURSE = '[COURSE] change edit',
  LOAD_AUTHORS = '[COURSE] load authors'
}

export type CoursesActions =
  ActionPayload<CoursesActionsTypes.UPDATE_LIST, CourseRequest[]>
  | ActionPayload<CoursesActionsTypes.UPDATE_COUNT, number>
  | ActionPayload<CoursesActionsTypes.CHANGE_PAGE, number>
  | ActionPayload<CoursesActionsTypes.CHANGE_QUERY, string>
  | ActionPayload<CoursesActionsTypes.UPDATE_AUTHORS, Author[]>
  | ActionPayload<CoursesActionsTypes.CHANGE_EDIT_COURSE, CourseRequest>;
