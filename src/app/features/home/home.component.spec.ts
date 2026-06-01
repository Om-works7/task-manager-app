import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authServiceMock: jest.Mocked<AuthService>;
  let routerMock: jest.Mocked<Router>;

  beforeEach(async () => {
    authServiceMock = {
      login: jest.fn(),
    } as any;

    routerMock = {
      navigate: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login when login() is triggered', () => {
    component.login();

    expect(authServiceMock.login).toHaveBeenCalled();
  });

  it('should navigate to /tasks after login', () => {
    component.login();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/tasks']);
  });

  it('should call login and navigate together', () => {
    component.login();

    expect(authServiceMock.login).toHaveBeenCalledTimes(1);
    expect(routerMock.navigate).toHaveBeenCalledTimes(1);
  });
});