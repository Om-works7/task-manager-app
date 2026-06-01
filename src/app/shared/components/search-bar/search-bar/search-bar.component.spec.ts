import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { TaskService } from '../../../../core/services/task/task.service';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let taskServiceMock: any;

  beforeEach(async () => {
    taskServiceMock = {}; // prevent DI error

    await TestBed.configureTestingModule({
      imports: [SearchBarComponent],
      providers: [{ provide: TaskService, useValue: taskServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search value after debounce', fakeAsync(() => {
    const spy = jest.spyOn(component.searchChange, 'emit');

    component.onSearch('test');

    tick(500);

    expect(spy).toHaveBeenCalledWith('test');
  }));

  it('should debounce multiple inputs and emit latest value', fakeAsync(() => {
    const spy = jest.spyOn(component.searchChange, 'emit');

    component.onSearch('t');
    component.onSearch('te');
    component.onSearch('tes');
    component.onSearch('test');

    tick(500);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('test');
  }));
});