import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { PersistenceService } from '../services/persistence.service';

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
