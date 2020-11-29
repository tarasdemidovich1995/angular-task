import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState, COURSES_REDUCER_NODE } from './course.reducers';

export const coursesFeatureSelector = createFeatureSelector<CoursesState>(COURSES_REDUCER_NODE);

export const coursesListSelector = createSelector(
  coursesFeatureSelector,
  (state: CoursesState) => state.list
);

export const coursesQuerySelector = createSelector(
  coursesFeatureSelector,
  (state: CoursesState)  => state.query
);

export const coursesPageSelector = createSelector(
  coursesFeatureSelector,
  (state: CoursesState) => state.currentPage
);

export const coursesCountSelector = createSelector(
  coursesFeatureSelector,
  (state: CoursesState) => state.count
);

export const coursesAuthorsSelector = createSelector(
  coursesFeatureSelector,
  (state: CoursesState) => state.authors
);

export const editedCourseSelector = createSelector(
  coursesFeatureSelector,
  (state: CoursesState) => state.editedCourse,
);
