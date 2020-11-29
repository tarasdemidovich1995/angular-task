import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AlertState, ALERT_REDUCER_NODE } from './alert.reducers';

export const coursesFeatureSelector = createFeatureSelector<AlertState>(ALERT_REDUCER_NODE);

export const alertSelector = createSelector(
  coursesFeatureSelector,
  (state: AlertState) => state
);
