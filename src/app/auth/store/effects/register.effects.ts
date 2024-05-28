import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { authActions } from '../auth.actions';
import { CurrentUserInterface } from '../../../shared/types/current-user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistanceService } from '../../../shared/services/persistance.service';

@Injectable()
export class RegisterEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistanceService.set('accessToken', currentUser.token);

            return authActions.registerSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.registerFailure({
                errors: errorResponse.error.errors,
              })
            )
          )
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.registerSuccess),
        tap(() => this.router.navigateByUrl('/'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}
}
