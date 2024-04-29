import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { PersistanceService } from '../services/persistance.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const persistanceService = inject(PersistanceService);
  const token = persistanceService.get('accessToken');

  const newReq = req.clone({
    setHeaders: {
      Authorization: token ? `Token ${token}` : '',
    },
  });

  return next(newReq);
};
