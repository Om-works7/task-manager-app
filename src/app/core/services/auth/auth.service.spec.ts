import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);

    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'removeItem');
    jest.spyOn(Storage.prototype, 'getItem');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login: set signal true and store auth in localStorage', () => {
    service.login();

    expect(service.isLoggedIn()).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('auth', 'true');
  });

  it('should logout: set signal false and remove auth from localStorage', () => {
    service.logout();

    expect(service.isLoggedIn()).toBe(false);
    expect(localStorage.removeItem).toHaveBeenCalledWith('auth');
  });

  it('should return true when checkAuth finds auth=true in localStorage', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue('true');

    const result = service.checkAuth();

    expect(result).toBe(true);
    expect(localStorage.getItem).toHaveBeenCalledWith('auth');
  });

  it('should return false when checkAuth finds auth not equal to true', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue('false');

    const result = service.checkAuth();

    expect(result).toBe(false);
  });

  it('should return false when checkAuth finds no auth in localStorage', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);

    const result = service.checkAuth();

    expect(result).toBe(false);
  });
});