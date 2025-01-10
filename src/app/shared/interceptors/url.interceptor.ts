import { HttpInterceptorFn } from '@angular/common/http';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  // const baseUrl: string = 'https://api.greg-p.keenetic.pro/api';
  const baseUrl: string = 'https://conduit-realworld-example-app.fly.dev/api';

  return next(req.clone({ url: baseUrl + req.url }));
};
