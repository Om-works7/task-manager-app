import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('auth');

  const modifiedRequest = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });
  //WE CREATE A NEW REQUEST completely

  console.log('HTTP Request:', modifiedRequest);

  return next(modifiedRequest);
};