import { HttpInterceptorFn } from '@angular/common/http';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl: string = 'http://192.168.100.37:3000/api';

  return next(req.clone({ url: baseUrl + req.url }));
};
