import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

export const selectTaskState =
  createFeatureSelector<TaskState>('tasks');

export const selectTasks =
  createSelector(selectTaskState, state => state.tasks);

export const selectFilter =
  createSelector(selectTaskState, state => state.filter);

export const selectSearch =
  createSelector(selectTaskState, state => state.search);

export const selectFilteredTasks = createSelector(
  selectTasks,
  selectFilter,
  selectSearch,
  (tasks, filter, search) => {

    let result = tasks;

    if (filter === 'completed') {
      result = result.filter(t => t.completed);
    } else if (filter === 'pending') {
      result = result.filter(t => !t.completed);
    }

    if (search) {
      result = result.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return result;
  }
);