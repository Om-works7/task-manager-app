import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpMock = {
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
      patch: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: HttpClient, useValue: httpMock },
      ],
    });

    service = TestBed.inject(TaskService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getTasks and return tasks', () => {
    const mockTasks = [{ id: '1', title: 'Test' }] as any;
    httpMock.get.mockReturnValue(of(mockTasks));

    const result$ = service.getTasks();

    expect(httpMock.get).toHaveBeenCalledWith('http://localhost:3000/tasks');
    result$.subscribe(res => {
      expect(res).toEqual(mockTasks);
    });
  });

  it('should call addTask and return created task', () => {
    const task = { id: '1', title: 'New Task' } as any;
    httpMock.post.mockReturnValue(of(task));

    const result$ = service.addTask(task);

    expect(httpMock.post).toHaveBeenCalledWith('http://localhost:3000/tasks', task);
    result$.subscribe(res => {
      expect(res).toEqual(task);
    });
  });

  it('should call deleteTask with correct id', () => {
    httpMock.delete.mockReturnValue(of({}));

    const result$ = service.deleteTask('1');

    expect(httpMock.delete).toHaveBeenCalledWith('http://localhost:3000/tasks/1');
    result$.subscribe(res => {
      expect(res).toEqual({});
    });
  });

  it('should call toggleTask with correct id', () => {
    httpMock.patch.mockReturnValue(of({}));

    const result$ = service.toggleTask('1');

    expect(httpMock.patch).toHaveBeenCalledWith('http://localhost:3000/tasks/1', {});
    result$.subscribe(res => {
      expect(res).toEqual({});
    });
  });
});