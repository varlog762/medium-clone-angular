import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { PersistenceService } from '../services/persistence.service';

/**
 * HttpInterceptor that adds Authorization header with token to all requests.
 * It uses {@link PersistenceService} to get the token from local storage.
 * If token is not found, the header is not added.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const persistenceService = inject(PersistenceService);
  const token = persistenceService.get('accessToken');

  const newReq = req.clone({
    setHeaders: {
      Authorization: token ? `Token ${token}` : '',
    },
  });

  return next(newReq);
};
