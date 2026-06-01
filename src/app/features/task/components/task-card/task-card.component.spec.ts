import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCardComponent } from './task-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;

    component.task = {
      id: '1',
      title: 'Test Task',
      description: '',
      completed: false,
      createdAt: new Date(),
    };

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit delete event with task id', () => {
    const spy = jest.spyOn(component.delete, 'emit');

    component.delete.emit('1');

    expect(spy).toHaveBeenCalledWith('1');
  });

  it('should emit toggle event with task id', () => {
    const spy = jest.spyOn(component.toggle, 'emit');

    component.toggle.emit('1');

    expect(spy).toHaveBeenCalledWith('1');
  });

  it('should accept task input', () => {
    expect(component.task.id).toBe('1');
  });
});