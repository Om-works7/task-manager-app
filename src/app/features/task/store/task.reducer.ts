import { createReducer, on } from '@ngrx/store';
import * as TaskActions from './task.actions';
import { Task } from '../../../shared/models/task.model';

export interface TaskState {
  tasks: Task[];
  filter: 'all' | 'completed' | 'pending';
  search: string;
}

const initialState: TaskState = {
  tasks: [],
  filter: 'all',
  search: ''
};

export const taskReducer = createReducer(
  initialState,

  on(TaskActions.loadTasksSuccess,(state,{tasks})=>({
    ...state,
    tasks
  })),

  on(TaskActions.setTasks, (state, { tasks }) => ({
    ...state,
    tasks
  })),

  on(TaskActions.addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task]
  })),
  
on(TaskActions.addTaskSuccess, (state, { task }) => ({
  ...state,
  tasks: [...state.tasks, task]
})),


  on(TaskActions.deleteTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter(t => t.id !== id)
  })),
  
on(TaskActions.deleteTaskSuccess, (state, { id }) => ({
  ...state,
  tasks: state.tasks.filter(t => t.id !== id)
})),


  on(TaskActions.toggleTask, (state, { id }) => ({
    ...state,
    tasks: state.tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    )
  })),

  
on(TaskActions.toggleTaskSuccess, (state, { id }) => ({
  ...state,
  tasks: state.tasks.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t
  )
})),


  on(TaskActions.setFilter, (state, { filter }) => ({
    ...state,
    filter
  })),

  on(TaskActions.setSearch, (state, { search }) => ({
    ...state,
    search
  }))
);