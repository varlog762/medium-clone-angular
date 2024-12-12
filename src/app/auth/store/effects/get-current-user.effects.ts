import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { authActions } from '../auth.actions';
import { CurrentUserInterface } from '../../../shared/types/current-user.interface';
import { PersistenceService } from '../../../shared/services/persistence.service';

@Injectable()
export class GetCurrentUserEffects {
  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.getCurrentUser),
      switchMap(() => {
        const token = this.persistenceService.get('accessToken');

        if (!token) {
          return of(authActions.getCurrentUserFailure());
        }

        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) =>
            authActions.getCurrentUserSuccess({ currentUser })
          ),
          catchError(() => of(authActions.getCurrentUserFailure()))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService
  ) {}
}
