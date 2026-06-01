import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth/auth.service';

describe('authGuard', () => {
  let authServiceMock: jest.Mocked<AuthService>;
  let routerMock: jest.Mocked<Router>;

  const executeGuard = () =>
    TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

  beforeEach(() => {
    authServiceMock = {
      checkAuth: jest.fn(),
    } as any;

    routerMock = {
      navigate: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  // ✅ 1: User is authenticated
  it('should return true when user is authenticated', () => {
    authServiceMock.checkAuth.mockReturnValue(true);

    const result = executeGuard();

    expect(result).toBe(true);
    expect(authServiceMock.checkAuth).toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  // Case 2: User is NOT authenticated
  it('should navigate to "/" and return false when user is not authenticated', () => {
    authServiceMock.checkAuth.mockReturnValue(false);

    const result = executeGuard();

    expect(result).toBe(false);
    expect(authServiceMock.checkAuth).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});