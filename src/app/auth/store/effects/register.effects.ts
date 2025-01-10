import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { authActions } from '../auth.actions';
import { CurrentUserInterface } from '../../../shared/types/current-user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PersistenceService } from '../../../shared/services/persistence.service';
import { DefaultErrorValuesEnum } from '../../../shared/enums/default-error-values.enum';

@Injectable()
export class RegisterEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) => {
        return this.authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistenceService.set('accessToken', currentUser.token);

            return authActions.registerSuccess({ currentUser });
          }),
          catchError((errorResponse: HttpErrorResponse) =>
            of(
              authActions.registerFailure({
                errors: errorResponse?.error?.errors ?? {
                  register: [DefaultErrorValuesEnum.DEFAULT_REGISTER_ERROR],
                },
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
    private persistenceService: PersistenceService,
    private router: Router
  ) {}
}
