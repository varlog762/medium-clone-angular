import { HttpInterceptorFn } from '@angular/common/http';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl: string = 'http://127.0.0.1:3000/api';

  return next(req.clone({ url: baseUrl + req.url }));
};
