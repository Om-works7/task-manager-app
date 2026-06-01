import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskPageComponent } from './task-page.component';
import { Store } from '@ngrx/store';
import * as TaskActions from '../../store/task.actions';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TaskService } from '../../../../core/services/task/task.service';

describe('TaskPageComponent', () => {
  let component: TaskPageComponent;
  let fixture: ComponentFixture<TaskPageComponent>;
  let storeMock: any;

  beforeEach(async () => {
    storeMock = {
      dispatch: jest.fn(),
      select: jest.fn().mockReturnValue(of([])),
    };

    const taskServiceMock = {}; // ✅ prevents HttpClient injection

    await TestBed.configureTestingModule({
      imports: [TaskPageComponent],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: TaskService, useValue: taskServiceMock }, 
      ],
      schemas: [NO_ERRORS_SCHEMA], // ✅ ignore child components
    }).compileComponents();

    fixture = TestBed.createComponent(TaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTasks on ngOnInit', () => {
    component.ngOnInit();
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      TaskActions.loadTasks()
    );
  });

  it('should dispatch setSearch action', () => {
    component.setSearch('abc');
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      TaskActions.setSearch({ search: 'abc' })
    );
  });

  it('should dispatch setFilter action', () => {
    component.setFilter('pending');
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      TaskActions.setFilter({ filter: 'pending' })
    );
  });

  it('should dispatch addTask and close modal', () => {
    const task = { id: '1', title: 't' } as any;
    jest.spyOn(component, 'closeModal');

    component.addTask(task);

    expect(storeMock.dispatch).toHaveBeenCalledWith(
      TaskActions.addTask({ task })
    );
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should dispatch deleteTask', () => {
    component.deleteTask('1');
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      TaskActions.deleteTask({ id: '1' })
    );
  });

  it('should dispatch toggleTask', () => {
    component.toggleTask('1');
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      TaskActions.toggleTask({ id: '1' })
    );
  });

  it('should open modal', () => {
    component.openModal();
    expect(component.showModal()).toBe(true);
  });

  it('should close modal', () => {
    component.openModal();
    component.closeModal();
    expect(component.showModal()).toBe(false);
  });
});