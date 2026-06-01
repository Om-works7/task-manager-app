import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write value correctly', () => {
    component.writeValue('test');
    expect(component.value).toBe('test');
  });

  it('should set default empty value if null passed', () => {
    component.writeValue(null as any);
    expect(component.value).toBe('');
  });

  it('should register onChange function', () => {
    const fn = jest.fn();
    component.registerOnChange(fn);

    component.onChange('abc');

    expect(fn).toHaveBeenCalledWith('abc');
  });

  it('should register onTouched function', () => {
    const fn = jest.fn();
    component.registerOnTouched(fn);

    component.onTouched();

    expect(fn).toHaveBeenCalled();
  });

  it('should update value and call onChange on input event', () => {
    const changeFn = jest.fn();
    component.registerOnChange(changeFn);

    const event = {
      target: { value: 'new value' },
    } as unknown as Event;

    component.onInput(event);

    expect(component.value).toBe('new value');
    expect(changeFn).toHaveBeenCalledWith('new value');
  });

  it('should call onTouched on blur', () => {
    const touchFn = jest.fn();
    component.registerOnTouched(touchFn);

    component.onBlur();

    expect(touchFn).toHaveBeenCalled();
  });
});