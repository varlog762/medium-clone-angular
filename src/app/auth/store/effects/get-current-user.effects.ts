import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { AuthActions } from '../auth.actions';
import { CurrentUserInterface } from '../../../shared/types/current-user.interface';
import { PersistanceService } from '../../../shared/services/persistance.service';

@Injectable()
export class GetCurrentUserEffects {
  getCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getCurrentUser),
      switchMap(() => {
        return this.authService.getCurrentUser().pipe(
          map((currentUser: CurrentUserInterface) =>
            AuthActions.getCurrentUserSuccess({ currentUser })
          ),
          catchError(() => of(AuthActions.getCurrentUserFailure()))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService
  ) {}
}
