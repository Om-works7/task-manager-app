import { createAction, props } from "@ngrx/store";
import { Task } from "../../../shared/models/task.model";


export const loadTasks = createAction('[Task] Load Tasks');

export const setTasks = createAction(
  '[Task] Set Tasks',
  props<{ tasks: Task[] }>()
);

export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Task] Delete Task',
  props<{ id: string }>()
);

export const toggleTask = createAction(
  '[Task] Toggle Task',
  props<{ id: string }>()
);

export const setFilter = createAction(
  '[Task] Set Filter',
  props<{ filter: 'all' | 'completed' | 'pending' }>()
);

export const setSearch = createAction(
  '[Task] Set Search',
  props<{ search: string }>()
);