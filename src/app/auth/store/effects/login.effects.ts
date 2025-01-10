import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { authActions } from '../auth.actions';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from '../../../shared/types/current-user.interface';
import { PersistenceService } from '../../../shared/services/persistence.service';
import { DefaultErrorValuesEnum } from '../../../shared/enums/default-error-values.enum';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      switchMap(({ request }) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistenceService.set('accessToken', currentUser.token);

            return authActions.loginSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              authActions.loginFailure({
                errors: errorResponse?.error?.errors ?? {
                  login: [DefaultErrorValuesEnum.DEFAULT_LOGIN_ERROR],
                },
              })
            );
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.loginSuccess),
        tap(() => this.router.navigateByUrl('/'))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private persistenceService: PersistenceService,
    private router: Router
  ) {}
}
