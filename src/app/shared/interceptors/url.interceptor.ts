import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Adds base URL to the request URL.
 *
 * Modifies the request by adding a base URL to the request URL.
 * The base URL is the URL of the API endpoint that the request is being sent to.
 * The `url` property is modified in-place.
 *
 * @param req The request.
 * @param next The next interceptor in the chain.
 * @returns The modified request.
 */
export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl: string = 'https://api.greg-p.keenetic.pro/api';

  return next(req.clone({ url: baseUrl + req.url }));
};
