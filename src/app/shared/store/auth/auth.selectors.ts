import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, AUTH_REDUCER_NODE } from './auth.reducers';

export const coursesFeatureSelector = createFeatureSelector<AuthState>(AUTH_REDUCER_NODE);

export const authUserSelector = createSelector(
  coursesFeatureSelector,
  (state: AuthState) => state.user
);
