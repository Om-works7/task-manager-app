import { taskReducer, TaskState } from './task.reducer';
import * as TaskActions from './task.actions';

describe('taskReducer', () => {

  const initialState: TaskState = {
    tasks: [],
    filter: 'all',
    search: ''
  };

  it('should return initial state', () => {
    const action = { type: 'unknown' } as any;

    const state = taskReducer(initialState, action);

    expect(state).toEqual(initialState);
  });

  it('should handle loadTasksSuccess', () => {
    const tasks = [{ id: '1', title: 'task', completed: false }] as any;

    const action = TaskActions.loadTasksSuccess({ tasks });
    const state = taskReducer(initialState, action);

    expect(state.tasks).toEqual(tasks);
  });

  it('should handle addTaskSuccess', () => {
    const newTask = { id: '1', title: 'task', completed: false } as any;

    const action = TaskActions.addTaskSuccess({ task: newTask });
    const state = taskReducer(initialState, action);

    expect(state.tasks).toEqual([newTask]);
  });

  it('should handle deleteTaskSuccess', () => {
    const stateWithTasks: TaskState = {
      ...initialState,
      tasks: [
        { id: '1', title: 't1', completed: false },
        { id: '2', title: 't2', completed: true }
      ] as any
    };

    const action = TaskActions.deleteTaskSuccess({ id: '1' });
    const state = taskReducer(stateWithTasks, action);

    expect(state.tasks).toEqual([
      { id: '2', title: 't2', completed: true }
    ]);
  });

  it('should handle toggleTaskSuccess', () => {
    const stateWithTasks: TaskState = {
      ...initialState,
      tasks: [
        { id: '1', title: 't1', completed: false }
      ] as any
    };

    const action = TaskActions.toggleTaskSuccess({ id: '1' });
    const state = taskReducer(stateWithTasks, action);

    expect(state.tasks[0].completed).toBe(true);
  });

  it('should handle setFilter', () => {
    const action = TaskActions.setFilter({ filter: 'completed' });
    const state = taskReducer(initialState, action);

    expect(state.filter).toBe('completed');
  });

  it('should handle setSearch', () => {
    const action = TaskActions.setSearch({ search: 'abc' });
    const state = taskReducer(initialState, action);

    expect(state.search).toBe('abc');
  });

});