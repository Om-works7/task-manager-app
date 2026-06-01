import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { TaskEffects } from './task.effects';
import * as TaskActions from './task.actions';
import { TaskService } from '../../../core/services/task/task.service';

describe('TaskEffects', () => {
  let actions$: Observable<any>;
  let effects: TaskEffects;
  let taskServiceMock: jest.Mocked<TaskService>;

  beforeEach(() => {
    taskServiceMock = {
      getTasks: jest.fn(),
      addTask: jest.fn(),
      deleteTask: jest.fn(),
      toggleTask: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      providers: [
        TaskEffects,
        provideMockActions(() => actions$),
        { provide: TaskService, useValue: taskServiceMock },
      ],
    });

    effects = TestBed.inject(TaskEffects);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch loadTasksSuccess', (done) => {
    const tasks = [{ id: '1', title: 'task' }] as any;
    taskServiceMock.getTasks.mockReturnValue(of(tasks));

    actions$ = of(TaskActions.loadTasks());

    effects.loadTasks$.subscribe(action => {
      expect(action).toEqual(
        TaskActions.loadTasksSuccess({ tasks })
      );
      done();
    });
  });

  it('should dispatch addTaskSuccess', (done) => {
    const task = { id: '1', title: 'task' } as any;
    taskServiceMock.addTask.mockReturnValue(of(task));

    actions$ = of(TaskActions.addTask({ task }));

    effects.addTask$.subscribe(action => {
      expect(action).toEqual(
        TaskActions.addTaskSuccess({ task })
      );
      done();
    });
  });

  it('should dispatch deleteTaskSuccess', (done) => {
    taskServiceMock.deleteTask.mockReturnValue(of({}));

    actions$ = of(TaskActions.deleteTask({ id: '1' }));

    effects.deleteTask$.subscribe(action => {
      expect(action).toEqual(
        TaskActions.deleteTaskSuccess({ id: '1' })
      );
      done();
    });
  });

  it('should dispatch toggleTaskSuccess', (done) => {
    taskServiceMock.toggleTask.mockReturnValue(of({}));

    actions$ = of(TaskActions.toggleTask({ id: '1' }));

    effects.toggleTask$.subscribe(action => {
      expect(action).toEqual(
        TaskActions.toggleTaskSuccess({ id: '1' })
      );
      done();
    });
  });
});