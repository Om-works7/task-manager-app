import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {

  const interceptor = (req: HttpRequest<any>, next: HttpHandlerFn) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});

    // Mock localStorage
    jest.spyOn(Storage.prototype, 'getItem');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Basic sanity test
  it('should be defined', () => {
    expect(authInterceptor).toBeDefined();
  });

  // Case 1: Token exists
  it('should add Authorization header when token exists', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue('mock-token');

    const req = new HttpRequest('GET', '/api/test');

    const next: jest.MockedFunction<HttpHandlerFn> = jest.fn();

    interceptor(req, next);

    expect(localStorage.getItem).toHaveBeenCalledWith('auth');

    const modifiedReq = next.mock.calls[0][0];

    expect(modifiedReq.headers.get('Authorization')).toBe('Bearer mock-token');
  });

  // Case 2: Token is null
  it('should still call next with Bearer null when token is missing', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);

    const req = new HttpRequest('GET', '/api/test');

    const next: jest.MockedFunction<HttpHandlerFn> = jest.fn();

    interceptor(req, next);

    const modifiedReq = next.mock.calls[0][0];

    expect(modifiedReq.headers.get('Authorization')).toBe('Bearer null');
  });

  // Case 3: Ensure next() is always called
  it('should pass modified request to next handler', () => {
    (localStorage.getItem as jest.Mock).mockReturnValue('token');

    const req = new HttpRequest('GET', '/api/test');

    const next: jest.MockedFunction<HttpHandlerFn> = jest.fn();

    interceptor(req, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});