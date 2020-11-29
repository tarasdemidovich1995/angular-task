import { Author, Course, CourseRequest } from 'src/app/interfaces';
import { CoursesActions, CoursesActionsTypes } from './course.actions';
import * as moment from 'moment';

export const COURSES_REDUCER_NODE = 'courses';

export interface CoursesState {
  list: Course[];
  query: string;
  count: number;
  currentPage: number;
  authors: Author[];
  editedCourse: CourseRequest;
}

const initialState: CoursesState = {
  list: [],
  query: '',
  count: 0,
  currentPage: 0,
  authors: [],
  editedCourse: null,
};

export const coursesReducer = (state = initialState, action: CoursesActions) => {
  switch (action.type) {
    case CoursesActionsTypes.UPDATE_LIST:
      return {
        ...state,
        list: action.payload.map((course) => ({...course, date: moment(course.date)}))
      };
    case CoursesActionsTypes.UPDATE_COUNT:
      return {
        ...state,
        count: action.payload
      };
    case CoursesActionsTypes.CHANGE_QUERY:
      return {
        ...state,
        query: action.payload,
        currentPage: 0
      };
    case CoursesActionsTypes.CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };
    case CoursesActionsTypes.UPDATE_AUTHORS:
      return {
        ...state,
        authors: action.payload
      };
    case CoursesActionsTypes.CHANGE_EDIT_COURSE:
      return {
        ...state,
        editedCourse: action.payload
      };
    default:
      return state;
  }
};
